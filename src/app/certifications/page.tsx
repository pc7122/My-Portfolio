import CertificationsClient from "./CertificationsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Verified professional credentials and academic course certifications of Prathamesh Chaudhary.",
};

export default function CertificationsPage() {
  return <CertificationsClient />;
}

