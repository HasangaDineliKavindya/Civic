import { collection, addDoc, updateDoc, getDocs, doc, query, where, setDoc, arrayUnion } from 'firebase/firestore';
import { ref, uploadBytes, } from 'firebase/storage';
import { imageDb, db, } from './firebase'; // Updated import for firestore
import moment from 'moment';


async function uploadImage(uniqueId, img) {
    const imageType = img.type;

    console.log("image type", imageType);
    const imgRef = ref(imageDb, `complaints/${uniqueId}/image.${imageType.split('/')[1]}`);
    await uploadBytes(imgRef, img);
}

async function uploadTextFile(uniqueId, text) {
    const textBlob = new Blob([text], { type: 'text/plain' });

    const fileRef = ref(imageDb, `complaints/${uniqueId}/description.txt`);

    await uploadBytes(fileRef, textBlob);
}

async function saveComplaint(uniqueId, image, description, mapUrl, isAnonymous, authority, contactNumber, currentUser) {
    try {
        // Upload image
        await uploadImage(uniqueId, image);

        await uploadTextFile(uniqueId, description);

        const imageType = image.type;

        const existingComplaintsQuery = query(collection(db, 'complaints'), where('url', '==', mapUrl));
        const existingComplaintsSnapshot = await getDocs(existingComplaintsQuery);
        const complaintsCount = existingComplaintsSnapshot.size + 1; // Increment the count by 1 for the new complaint

        console.log("found complaints from the same location", existingComplaintsSnapshot);

        // Update the count for each existing complaint
        existingComplaintsSnapshot.forEach(async (doc) => {
            const existingComplaintRef = doc.ref;
            const existingComplaintData = doc.data();

            // Increment the count for the existing complaint
            const existingComplaintNewCount = (existingComplaintData.complaintsCount || 0) + 1;

            // Update the count in Firestore
            await updateDoc(existingComplaintRef, { complaintsCount: existingComplaintNewCount });
        });

        // Add a new complaint document
        const docRef = await addDoc(collection(db, 'complaints'), {
            id: uniqueId,
            text: `complaints/${uniqueId}/description.txt`,
            image: `complaints/${uniqueId}/image.${imageType.split('/')[1]}`,
            url: mapUrl,
            isAnonymous,
            authority,
            status: "PENDING",
            contactNumber: isAnonymous ? '' : contactNumber,
            date: moment().format('YYYY-MM-DD'),
            uid: currentUser.uid,
            complaintsCount: complaintsCount // Update the complaints count for the new complaint
        });

        console.log("Saved document:", docRef.id);

        const q = query(collection(db, "users"), where("uid", "==", currentUser.uid));
        const userDocsSnapshot = await getDocs(q);

        console.log("existing user", userDocsSnapshot);

        if (userDocsSnapshot.docs.length > 0) {
            await setDoc(doc(db, 'users', currentUser.uid), {
                complaints: arrayUnion(uniqueId),
            }, { merge: true });
        } else {
            await setDoc(doc(db, 'users', currentUser.uid), {
                name: currentUser.displayName,
                email: currentUser.email,
                complaints: [uniqueId],
                uid: currentUser.uid
            });
        }
    } catch (error) {
        console.error("Error saving complaint:", error);
    }
}


export { saveComplaint }