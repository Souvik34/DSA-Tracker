/* eslint-disable prettier/prettier */

import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Code2,
  Database,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030408] text-white">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="
            absolute
            -left-[180px]
            -top-[180px]
            h-[600px]
            w-[600px]
            rounded-full
            bg-blue-600/[0.08]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            -right-[200px]
            top-[20%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-violet-600/[0.07]
            blur-[160px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.018]
            [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)]
            [background-size:56px_56px]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(3,4,8,.5)_100%)]
          "
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 pt-7">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-white/55
              transition
              hover:text-white
            "
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Dykstra
          </Link>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.09]
              bg-white/[0.025]
              px-3
              py-1.5
              backdrop-blur-xl
            "
          >
            <div
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                via-blue-500
                to-violet-500
              "
            >
              <Code2 className="h-3.5 w-3.5" />
            </div>

            <span className="text-xs font-bold">
              Dykstra
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="relative z-10 px-6 pb-24 pt-16 sm:pt-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(6px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-4xl"
        >
          {/* Heading */}
          <div className="text-center">
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-gradient-to-br
                from-cyan-400/[0.12]
                via-blue-500/[0.10]
                to-violet-500/[0.14]
                shadow-[0_0_45px_rgba(34,211,238,.10)]
              "
            >
              <LockKeyhole className="h-6 w-6 text-cyan-300" />
            </div>

            <p
              className="
                mt-7
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-cyan-300
              "
            >
              Privacy
            </p>

            <h1
              className="
                mt-3
                text-4xl
                font-black
                tracking-[-0.04em]
                sm:text-5xl
              "
            >
              Privacy Policy
            </h1>

            <p className="mt-4 text-sm text-white/40">
              Last updated: August 20, 2026
            </p>
          </div>

          {/* Document */}
          <div
            className="
              relative
              mt-12
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.08]
              bg-[#080a10]/80
              p-6
              shadow-[0_35px_120px_rgba(0,0,0,.45)]
              backdrop-blur-2xl
              sm:p-10
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0
                h-px
                w-2/3
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-cyan-400/60
                to-transparent
              "
            />

            <LegalSection title="1. Overview">
              <p>
                This Privacy Policy explains how Dykstra
                collects, uses and protects information when
                you use the platform.
              </p>

              <p>
                We aim to collect only the information needed
                to provide and improve the service.
              </p>
            </LegalSection>

            <LegalSection title="2. Information You Provide">
              <p>
                When you create an account or use Dykstra, we
                may collect information such as your name,
                email address, account credentials and other
                information you choose to provide.
              </p>

              <p>
                If you submit feedback, reviews or other
                content, we may store that information so we
                can process and improve the product.
              </p>
            </LegalSection>

            <LegalSection title="3. Activity & Progress Data">
              <p>
                Dykstra may store information related to your
                preparation activity, including problems
                attempted or solved, revision activity,
                topics, progress and interview activity.
              </p>

              <p>
                This information allows Dykstra to provide
                features such as progress tracking,
                recommendations and intelligent revision.
              </p>
            </LegalSection>

            <LegalSection title="4. How We Use Information">
              <p>
                Information may be used to:
              </p>

              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Provide and maintain Dykstra.
                </li>
                <li>
                  Track your preparation progress.
                </li>
                <li>
                  Provide revision and recommendation
                  features.
                </li>
                <li>
                  Provide AI-powered interview experiences.
                </li>
                <li>
                  Improve product functionality and
                  reliability.
                </li>
                <li>
                  Respond to feedback and support requests.
                </li>
              </ul>
            </LegalSection>

            <LegalSection title="5. AI Features">
              <p>
                Some Dykstra features may use third-party AI
                services to generate interview questions,
                feedback, recommendations or other
                preparation-related content.
              </p>

              <p>
                Information sent to these services is limited
                to what is necessary for the relevant feature,
                subject to the providers and configuration
                used by Dykstra.
              </p>
            </LegalSection>

            <LegalSection title="6. Cookies & Technical Data">
              <p>
                Dykstra may use cookies, local storage,
                authentication tokens and similar technologies
                that are necessary to operate the application
                and maintain your session.
              </p>

              <p>
                We may also collect technical information such
                as browser, device or error information when
                necessary to operate and improve the service.
              </p>
            </LegalSection>

            <LegalSection title="7. Data Security">
              <p>
                We take reasonable measures to protect
                information stored by Dykstra against
                unauthorized access, alteration or disclosure.
              </p>

              <p>
                However, no online service can guarantee
                absolute security.
              </p>
            </LegalSection>

            <LegalSection title="8. Data Retention">
              <p>
                We retain information for as long as it is
                reasonably necessary to provide the service,
                maintain your account, comply with legal
                obligations or resolve disputes.
              </p>
            </LegalSection>

            <LegalSection title="9. Your Choices">
              <p>
                You may choose what information you provide
                through optional features such as feedback.
                You may also request information about or
                deletion of your account data where applicable.
              </p>
            </LegalSection>

            <LegalSection title="10. Third-Party Services">
              <p>
                Dykstra may rely on third-party providers for
                infrastructure, authentication, databases,
                code execution, AI services, analytics or
                other functionality.
              </p>

              <p>
                Those providers may process information
                according to their own privacy policies and
                applicable agreements.
              </p>
            </LegalSection>

            <LegalSection title="11. Children's Privacy">
              <p>
                Dykstra is intended for developers preparing
                for technical interviews and is not designed
                specifically for children.
              </p>
            </LegalSection>

            <LegalSection title="12. Changes to This Policy">
              <p>
                We may update this Privacy Policy as Dykstra
                evolves. The latest version will always be
                available on this page.
              </p>
            </LegalSection>

            <LegalSection title="13. Contact">
              <p>
                If you have questions about this Privacy
                Policy or how your information is handled,
                please contact the Dykstra team through the
                available feedback or contact channels.
              </p>
            </LegalSection>

            {/* Trust cards */}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  p-4
                "
              >
                <Database className="h-5 w-5 text-cyan-300" />

                <p className="mt-3 text-sm font-semibold">
                  Purposeful data collection
                </p>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  Data is used to provide and improve your
                  preparation experience.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  p-4
                "
              >
                <ShieldCheck className="h-5 w-5 text-violet-300" />

                <p className="mt-3 text-sm font-semibold">
                  Built with privacy in mind
                </p>

                <p className="mt-1 text-xs leading-5 text-white/40">
                  We aim to keep your account and preparation
                  data protected.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-white/30 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Dykstra
          </span>

          <span>
            Built for developers preparing for what comes next.
          </span>
        </div>
      </footer>
    </main>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/[0.06] py-7 first:pt-0 last:border-0">
      <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
        {title}
      </h2>

      <div className="mt-3 space-y-3 text-sm leading-7 text-white/55 sm:text-base">
        {children}
      </div>
    </section>
  );
}