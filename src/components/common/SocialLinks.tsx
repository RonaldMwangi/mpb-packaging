import { FaInstagram, FaFacebookF, FaTiktok, FaXTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import "./SocialLinks.css";

const socials = [
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/mpb_packaging_ltd/" },
  { name: "Facebook", icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61585500680626" },
  { name: "TikTok", icon: FaTiktok, href: "https://www.tiktok.com/@mpb_packaging_limited" },
  { name: "X / Twitter", icon: FaXTwitter, href: "https://x.com/mpbpackaging" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "https://www.linkedin.com/company/mpb-packaging-limited" },
  { name: "WhatsApp", icon: FaWhatsapp, href: "https://api.whatsapp.com/send/?phone=254743554621&text&type=phone_number&app_absent=0" },
] as const;

export default function SocialLinks() {
  return <div className="social-links" aria-label="MPB social media">
    {socials.map(({ name, icon: Icon, href }) => (
      <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`MPB on ${name}`}>
        <Icon size={18} aria-hidden="true" />
      </a>
    ))}
  </div>;
}
