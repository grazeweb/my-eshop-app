import { notFound } from 'next/navigation';

const legalContent: { [key: string]: { title: string; content: React.ReactNode } } = {
  terms: {
    title: 'Terms & Conditions',
    content: (
      <div className="space-y-4">
        <p>Welcome to eShop. These terms and conditions outline the rules and regulations for the use of eShop's Website.</p>
        <h3 className="font-semibold pt-4">1. Introduction</h3>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use eShop if you do not agree to take all of the terms and conditions stated on this page.</p>
        <h3 className="font-semibold pt-4">2. Intellectual Property Rights</h3>
        <p>Other than the content you own, under these Terms, eShop and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
        <h3 className="font-semibold pt-4">3. Restrictions</h3>
        <p>You are specifically restricted from all of the following: publishing any Website material in any other media; selling, sublicensing and/or otherwise commercializing any Website material...</p>
      </div>
    ),
  },
  privacy: {
    title: 'Privacy Policy',
    content: (
       <div className="space-y-4">
        <p>Your privacy is important to us. It is eShop's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        <h3 className="font-semibold pt-4">1. Information We Collect</h3>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
        <h3 className="font-semibold pt-4">2. How We Use Your Information</h3>
        <p>We use the information we collect in various ways, including to: provide, operate, and maintain our website; improve, personalize, and expand our website; understand and analyze how you use our website...</p>
      </div>
    ),
  },
  returns: {
    title: 'Return & Refund Policy',
    content: (
       <div className="space-y-4">
        <p>Thanks for shopping at eShop. If you are not entirely satisfied with your purchase, we're here to help.</p>
        <h3 className="font-semibold pt-4">1. Returns</h3>
        <p>You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging.</p>
        <h3 className="font-semibold pt-4">2. Refunds</h3>
        <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(legalContent).map((slug) => ({
    slug,
  }));
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const page = legalContent[params.slug];

  if (!page) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline mb-8">{page.title}</h1>
        <div className="prose prose-lg max-w-none text-muted-foreground">
            {page.content}
        </div>
      </div>
    </div>
  );
}
