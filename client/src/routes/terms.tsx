/* eslint-disable prettier/prettier */

// import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Link,
  createFileRoute,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  Code2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
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
                border-blue-400/20
                bg-gradient-to-br
                from-cyan-400/[0.12]
                via-blue-500/[0.10]
                to-violet-500/[0.14]
                shadow-[0_0_45px_rgba(59,130,246,.12)]
              "
            >
              <FileText className="h-6 w-6 text-blue-300" />
            </div>

            <p
              className="
                mt-7
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-blue-300
              "
            >
              Legal
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
              Terms & Conditions
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
                via-blue-400/60
                to-transparent
              "
            />

            <LegalSection title="1. Acceptance of Terms">
              <p>
                By accessing or using Dykstra, you agree to
                these Terms & Conditions. If you do not agree
                with these terms, please do not use the
                service.
              </p>
            </LegalSection>

            <LegalSection title="2. About Dykstra">
              <p>
                Dykstra is an interview preparation platform
                designed to help developers practice data
                structures and algorithms, revise previously
                solved problems, practice technical
                interviews and understand their preparation
                progress.
              </p>
            </LegalSection>

            <LegalSection title="3. Your Account">
              <p>
                You are responsible for providing accurate
                information when creating an account and for
                keeping your account credentials secure.
              </p>

              <p>
                You are responsible for activity performed
                through your account and should notify us if
                you believe your account has been accessed
                without authorization.
              </p>
            </LegalSection>

            <LegalSection title="4. Using Dykstra">
              <p>
                You agree to use Dykstra only for lawful
                purposes and in a manner that does not
                interfere with the service or other users.
              </p>

              <p>
                You must not attempt to disrupt, abuse,
                reverse engineer, overload or gain
                unauthorized access to Dykstra or its
                infrastructure.
              </p>
            </LegalSection>

            <LegalSection title="5. Interview & AI Features">
              <p>
                Dykstra may provide AI-powered interview
                simulations, recommendations, feedback and
                other generated content.
              </p>

              <p>
                AI-generated content is provided as a
                preparation aid and should not be treated as a
                guarantee of interview performance, employment
                or hiring outcomes.
              </p>
            </LegalSection>

            <LegalSection title="6. Your Content & Feedback">
              <p>
                You retain ownership of content you submit to
                Dykstra, including feedback and other material
                you provide.
              </p>

              <p>
                By submitting feedback, you allow Dykstra to
                use that feedback to improve the service. If
                feedback is displayed publicly, we will avoid
                exposing information that you have not
                intentionally provided for that purpose.
              </p>
            </LegalSection>

            <LegalSection title="7. Availability">
              <p>
                We aim to keep Dykstra available and reliable,
                but we do not guarantee uninterrupted or
                error-free access to the service.
              </p>
            </LegalSection>

            <LegalSection title="8. Changes to the Service">
              <p>
                Dykstra may be updated, modified or improved
                over time. Features may be added, changed or
                removed as the product evolves.
              </p>
            </LegalSection>

            <LegalSection title="9. Changes to These Terms">
              <p>
                These Terms & Conditions may be updated from
                time to time. When material changes are made,
                the updated version will be made available on
                this page.
              </p>
            </LegalSection>

            <LegalSection title="10. Contact">
              <p>
                If you have questions about these Terms &
                Conditions, please contact the Dykstra team
                through the available feedback or contact
                channels.
              </p>
            </LegalSection>

            <div
              className="
                mt-12
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-4
              "
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />

              <p className="text-sm leading-6 text-white/45">
                These terms are intended to describe how
                Dykstra currently operates and may be updated
                as the product evolves.
              </p>
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