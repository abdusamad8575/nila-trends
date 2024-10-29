import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-white max-w-4xl mx-auto mt-16 lg:mt-36 mb-16 p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
        Terms and Conditions
      </h1>
      <p className="text-gray-700">
        Welcome to NILAA! These Terms and Conditions ("Terms") apply to both our
        physical retail location in the New Gold Souq Center, Al Mina Road, Al
        Raffa, Bur Dubai, Dubai, UAE, and our e-commerce platform accessible at{" "}
        <a
          href="https://www.nilaatrends.com"
          className="text-blue-500 underline"
        >
          https://www.nilaatrends.com
        </a>
        . By using our website or purchasing from NILAA, you agree to be bound
        by these Terms.
      </p>
      <div>
        <h2 className="text-xl mb-3 font-semibold mt-8">Business Information:</h2>
        <ul className="text-gray-700 list-disc list-inside space-y-2">
          <li>Company Name: AIRNXT General Trading LLC</li>
          <li>Retail Brand: NILAA, "The Stories of Threads"</li>
          <li>
            Location: Store 11, New Gold Souq Center, Al Mina Road, Al Raffa,
            Bur Dubai, Dubai, UAE
          </li>
          <li>
            <strong>Contact Information:</strong>
            <ul className="list-inside space-y-1">
              <li>Nayana Nireesh: +971556432500, +971521193364, <a href="mailto:nayana.nireesh@nilaatrends.com" className="text-blue-500 underline">nayana.nireesh@nilaatrends.com</a></li>
              <li>Nireesh Rajendran: +971564326643, <a href="mailto:nireesh.rajendran@airnxtgroup.com" className="text-blue-500 underline">nireesh.rajendran@airnxtgroup.com</a></li>
              <li>Website: <a href="https://www.nilaatrends.com" className="text-blue-500 underline">https://www.nilaatrends.com</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl mb-3 font-semibold mt-8">1. General Information</h2>
        <p className="text-gray-700">
          License and Jurisdiction: NILAA operates under a general trading
          license issued by the Dubai Department of Economic Development (DED).
          Our business practices adhere to Dubai mainland DED law, UAE Consumer
          Protection laws, and applicable international consumer standards.
        </p>
      </div>
      <div>
        <h2 className="text-xl mb-3 font-semibold mt-8">2. Eligibility and User Conduct</h2>
        <p className="text-gray-700">
          By using our website or shopping at NILAA, you confirm you are at
          least 18 years old or have parental consent and are able to comply
          with these Terms. Users agree to use the NILAA website only for lawful
          purposes and agree not to disrupt its functionality or compromise the
          privacy of other users.
        </p>
      </div>
      <div>
        <h2 className="text-xl mb-3 font-semibold mt-8">3. Account Registration</h2>
        <p className="text-gray-700">
          Registration: Users may need to create an account to access certain
          features or make purchases. You are responsible for maintaining
          confidentiality and for any actions taken through your account.
        </p>
        <p className="text-gray-700">
          Security: You agree to notify us immediately of any unauthorized
          access to your account.
        </p>
      </div>
      {/* Add remaining sections in a similar way */}
      <div>
        <h2 className="text-xl mb-3 font-semibold mt-8">4. Product Information and Pricing</h2>
        <p className="text-gray-700">
          NILAA makes every effort to provide accurate descriptions, images, and
          prices for all products. However, minor variations in color and size
          may occur. All prices are displayed in AED (or the relevant currency
          as applicable) and include VAT where required. Additional taxes or
          import duties may apply for international orders.
        </p>
      </div>
      <div>
        <h2 className="text-xl mb-3 font-semibold mt-8">5. Purchases and Payment</h2>
        <p className="text-gray-700">
          We accept major credit and debit cards, as well as alternative payment
          options where available. For online purchases, payments are processed
          securely through encrypted channels.
        </p>
        <p className="text-gray-700">
          Placing an order does not guarantee acceptance. We reserve the right
          to cancel or limit any orders for reasons such as stock availability
          or suspected fraud.
        </p>
      </div>
      {/* Repeat for each section */}
    </div>
  );
};

export default TermsAndConditions;
