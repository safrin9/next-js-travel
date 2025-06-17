// app/things-to-do/page.tsx
import Header from "@/components/ui/header";
import PageBanner from "@/components/ui/page-banner";
import Link from "next/link";
import Footer from "@/components/ui/footer";
export default function JapanLandingPage() {
  return (
    <div>
      <Header />
      <PageBanner
        title={`Things to do in Japan`}
        imageUrl={"/images/japan.jpg"}
        subtitle="Discover beautiful destinations, traditions, and top-rated experiences."
      />
      <Link href="/">Home</Link> /{" "}
      <Link href="/things-to-do">Things to do in Japan</Link> /{" "}
      <div className="mt-8 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Arigato for the memories
        </h2>
        <p className="text-gray-600">
          Ancient traditions blend harmoniously with cutting-edge technology and
          futuristic fashion in Japan. A visit to this astonishing country can
          be disorienting, yet sights often feel familiar thanks to cultural
          touchstones like sushi, sumo, and manga. From the bustling streets of
          Tokyo to the calm temples of Kyoto, there’s more than a lifetime’s
          worth of things to do.
        </p>
      </div>
      <div className="mt-12">
        {/* Optional: Render featured cities or categories here */}
      </div>
      <Footer />
    </div>
  );
}
