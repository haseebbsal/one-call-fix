import { Image } from "@nextui-org/image";
import Link from "next/link";

import { FOOTER_COLUMNS, FOOTER_TEXT } from "@/_utils/constant";

export default function SiteFooter() {
  return (
    <footer className="pt-16">
      <div className=" flex flex-wrap sm:px-24 px-4 w-full pb-4">
        <div className="flex sm:gap-16 gap-8 w-full sm:flex-nowrap  flex-wrap">
          <div className="sm:w-1/2 sm:block flex flex-col items-center sm:text-start text-center">
            <Image width={200} src="/logos/original-logo.png" alt="Logo" />

            <p className=" text-color-6 font-bold w-full">
              {FOOTER_TEXT.DESC}
            </p>
          </div>
          <div className="w-full">
            <div className="grid grid-cols-1 sm:gap-16 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3 w-full">
              {FOOTER_COLUMNS.map((section, index) => (
                <div className="text-center sm:text-start flex flex-col gap-2" key={index}>
                  <p className="text-gray-600 font-bold">{section.title}</p>
                  <ul className="flex flex-col gap-2  text-sm">
                    {section.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-color-6 transition hover:opacity-75"
                        >
                          {" "}
                          {link.text}{" "}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-8 flex gap-6 w-full sm:justify-start justify-center">
          <span>Follow :</span>
          {/* <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Instagram</span>

              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li> */}

          <li>
            <a
              href="https://www.facebook.com/profile.php?id=61558856376619 "
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Facebook</span>

              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          {/* <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:opacity-75"
            >
              <span className="sr-only">Pinterest</span>

              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12c0 4.627 2.664 8.633 6.53 10.432-.09-.888-.17-2.258.036-3.23.186-.807 1.213-5.143 1.213-5.143s-.31-.62-.31-1.536c0-1.44.835-2.515 1.875-2.515.883 0 1.31.664 1.31 1.46 0 .888-.567 2.218-.863 3.45-.245 1.033.52 1.873 1.54 1.873 1.845 0 3.263-1.946 3.263-4.748 0-2.482-1.78-4.219-4.327-4.219-2.944 0-4.671 2.207-4.671 4.493 0 .888.34 1.84.765 2.36.084.1.097.188.073.29-.08.35-.265 1.096-.3 1.246-.047.204-.155.248-.36.15-1.34-.62-2.173-2.566-2.173-4.126 0-3.372 2.45-6.465 7.078-6.465 3.714 0 6.605 2.654 6.605 6.202 0 3.68-2.317 6.644-5.54 6.644-1.08 0-2.093-.56-2.438-1.223l-.664 2.524c-.24.913-.89 2.06-1.333 2.75.998.31 2.056.48 3.165.48 6.628 0 12-5.372 12-12S18.628 0 12 0z" />
              </svg>
            </a>
          </li> */}
        </ul>
      </div>

      <div className="h-14 flex flex-col md:flex-row justify-center md:justify-between items-center bg-color-4 text-white text-center md:text-left p-4 md:px-36">
        <div className="">
          <p>Copyright © 2024 All rights reserved.</p>
        </div>
        <div className="gap-2 flex flex-wrap">
          <Link href="/cookies-policy" className="text-white">
            Cookies
          </Link>
          <span>|</span>
          <Link href="/privacy-policy" className="text-white">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/terms-and-conditions" className="text-white">
            Term & Condition Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
