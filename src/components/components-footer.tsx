'use client'

import React from 'react'
import Link from 'next/link'

const footerLinks = [
  { title: 'Product', links: ['Features', 'Enterprise', 'Security', 'Trust', 'Customer Stories'] },
  { title: 'Platform', links: ['Developer API', 'Partners', 'Apps', 'Electron'] },
  { title: 'Company', links: ['About Us', 'Careers', 'News', 'Media Kit', 'Contact Us'] },
  { title: 'Resources', links: ['Help Center', 'Guides', 'Events', 'Developers', 'App Directory'] },
]

export function FooterComponent() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img className="h-10" src="/images/slack-logo-white.svg" alt="Slack Clone" />
            <p className="text-gray-400 text-base">
              Making work life simpler, more pleasant and more productive.
            </p>
            <div className="flex space-x-6">
              {['facebook', 'twitter', 'github', 'dribbble'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(0, 2).map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{column.title}</h3>
                  <ul className="mt-4 space-y-4">
                    {column.links.map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-base text-gray-300 hover:text-white">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerLinks.slice(2).map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{column.title}</h3>
                  <ul className="mt-4 space-y-4">
                    {column.links.map((item) => (
                      <li key={item}>
                        <Link href="#" className="text-base text-gray-300 hover:text-white">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 Slack Clone, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}