import React from "react";
import Navbar from "./Navbar";
import "./Help.css";

const FAQ = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
        <div class="container">
          <div>

            <div className="title">
              <h1>Frequently Asked Questions</h1>

            </div>
            <div>
              <div class="faq-entry">
                <h3>How can I report a pothole?</h3>
                <span>You can report a pothole by navigating to the 'Report Issue' section and providing details along with images of the pothole.</span>
              </div>
              <div class="faq-entry">
                <h3>What types of issues can I report?</h3>
                <span>You can report various civic issues, including potholes, road issues, and infrastructure concerns.</span>
              </div>
              <div class="faq-entry">
                <h3>How long does it take to resolve an issue?</h3>
                <span>The resolution time varies depending on the complexity of the problem. We strive to address and resolve reported issues promptly.</span>
              </div>
              <div class="faq-entry">
                <h3>Is my report confidential?</h3>
                <span>Yes, your report is confidential. We prioritize user privacy and maintain the anonymity of reporters when necessary.</span>
              </div>
              <div class="faq-entry">
                <h3>Can I track the status of my reported issue?</h3>
                <span>Yes, you can track the progress of your reported issue in real-time through your user dashboard. We provide regular updates on issue statuses.</span>
              </div>
              <div class="faq-entry">
                <h3>How do I update my contact information?</h3>
                <span>To update your contact information, log in to your account and navigate to the 'Profile' section where you can edit your details.</span>
              </div>
              <div class="faq-entry">
                <h3>Are there any fees for using this reporting service?</h3>
                <span>No, our reporting service is completely free of charge. We believe in providing a public service to address civic issues.</span>
              </div>
              <div class="faq-entry">
                <h3>What do I do if my issue hasn't been resolved?</h3>
                <span>If your reported issue hasn't been resolved within a reasonable timeframe, you can contact our support team through the 'Contact Us' page for assistance.</span>
              </div>
              <div class="faq-entry">
                <h3>Can I report issues anonymously?</h3>
                <span>Yes, you have the option to report issues anonymously. We respect your privacy and provide this feature for users who prefer to remain anonymous.</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default FAQ;
