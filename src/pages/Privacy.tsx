import { motion } from 'motion/react';
import { config } from '@/data/config';

export function Privacy() {
  return (
    <div className="w-full pb-24">
      <section className="bg-[#1B4332] pt-20 pb-24 px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E6E0D4] prose prose-stone max-w-none">
          <p>Last updated: {new Date().getFullYear()}</p>
          
          <h2>1. Introduction</h2>
          <p>Welcome to {config.businessName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
          
          <h2>2. The Data We Collect About You</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes delivery address, email address and telephone numbers.</li>
            <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>

          <h2>3. How We Use Your Personal Data</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., to process your order).</li>
            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
          </ul>

          <h2>4. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us.</p>
        </div>
      </section>
    </div>
  );
}
