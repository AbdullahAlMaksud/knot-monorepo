"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FiGlobe, FiMail, FiPhone } from "react-icons/fi";
import { useGetWebsiteSettingsInfo } from "@/services/settings/settings-info/query";
import type {
  WebsiteLocation,
  WebsiteSocialLink,
} from "@/services/settings/settings-info/type";

const fallbackLocations: WebsiteLocation[] = [
  {
    id: "head-quarter",
    title: "Head Quarter",
    addressLine:
      "AriMo Glow UK Ltd, 124 City Road, Ec1v 2nx, London, United Kingdom",
  },
  {
    id: "local",
    title: "Local",
    addressLine:
      "AriMo Glow Bangladesh Operation, Ventura Iconia, Level 3, Block H, Banani 11, Dhaka-1213",
  },
];

const socialIconMap: Record<string, ReactNode> = {
  facebook: <FaFacebookF size={16} />,
  instagram: <FaInstagram size={16} />,
  linkedin: <FaLinkedinIn size={16} />,
  twitter: <FaXTwitter size={16} />,
  x: <FaXTwitter size={16} />,
  youtube: <FaYoutube size={16} />,
  tiktok: <FaTiktok size={16} />,
  email: <FiMail size={16} />,
  website: <FiGlobe size={16} />,
};

const getSocialIcon = (name: string): ReactNode => {
  return socialIconMap[name.trim().toLowerCase()] ?? <FiGlobe size={16} />;
};

const getValidSocials = (
  socials: WebsiteSocialLink[] | undefined,
): WebsiteSocialLink[] => {
  return (socials ?? []).filter(
    (social) => social.name.trim() && social.link.trim(),
  );
};

export default function Footer() {
  const { data: settingsInfo } = useGetWebsiteSettingsInfo();
  const locations =
    settingsInfo?.locations && settingsInfo.locations.length > 0
      ? settingsInfo.locations
      : fallbackLocations;
  const socials = getValidSocials(settingsInfo?.socials);

  return (
    <footer className="bg-black text-white relative overflow-hidden min-h-[600px]">
      {/* Giant BYOU Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none py-4">
        <div className="relative w-full h-full max-w-[1400px]">
          <Image
            src="/images/footer-logo.svg"
            alt="BYOU"
            fill
            className="object-contain opacity-60"
            priority
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Location</h3>
            <div className="space-y-4 text-sm text-gray-300">
              {locations.map((location) => (
                <div key={location.id}>
                  <p className="font-semibold text-white mb-1">
                    {location.title}
                  </p>
                  <p>{location.addressLine}</p>
                  {location.phone && <p>{location.phone}</p>}
                </div>
              ))}
              {(settingsInfo?.email || settingsInfo?.phone) && (
                <div className="space-y-2 pt-2">
                  {settingsInfo.email && (
                    <a
                      href={`mailto:${settingsInfo.email}`}
                      className="flex items-center gap-2 hover:text-white transition"
                    >
                      <FiMail size={14} />
                      {settingsInfo.email}
                    </a>
                  )}
                  {settingsInfo.phone && (
                    <a
                      href={`tel:${settingsInfo.phone}`}
                      className="flex items-center gap-2 hover:text-white transition"
                    >
                      <FiPhone size={14} />
                      {settingsInfo.phone}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Center Logo & Description */}
          <div className="text-center flex flex-col items-center justify-start">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.svg"
                alt="BYOU"
                width={150}
                height={60}
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-300 mb-6 max-w-xs">Just Be You</p>
            {socials.length > 0 && (
              <div className="flex justify-center space-x-4">
                {socials.map((social) => {
                  return (
                    <a
                      key={social.id}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
                    >
                      {getSocialIcon(social.name)}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* About Links */}
          <div className="sm:text-right">
            <h3 className="text-lg font-semibold mb-6">About</h3>
            <nav className="space-y-3 text-sm text-gray-300">
              <Link href="/about" className="block hover:text-white transition">
                About Us
              </Link>
              <Link
                href="/contact"
                className="block hover:text-white transition"
              >
                Contact Us
              </Link>
              <Link
                href="/shipping"
                className="block hover:text-white transition"
              >
                Shipping & Returns
              </Link>
              <Link
                href="/privacy"
                className="block hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 text-sm text-gray-400 z-20">
        <p>© 2025 Byou. All rights reserved.</p>
      </div>
    </footer>
  );
}
