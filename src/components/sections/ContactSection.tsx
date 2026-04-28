import { type FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { site } from "../../data/portfolio";
import { Reveal } from "../ui/Reveal";

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      aria-hidden
    >
      <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" />
    </svg>
  );
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = (): string | null => {
    const n = name.trim();
    const em = email.trim();
    const msg = message.trim();

    if (!n) return "Name is required";
    if (!em) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))
      return "Please enter a valid email";
    if (!msg) return "Message is required";
    return null;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name.trim(),
          from_email: email.trim(),
          message: message.trim(),
          to_email: "salemebrahim165@gmail.com",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-20"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <div className="mb-16 text-center">
          <h2
            id="contact-heading"
            className="mb-4 text-3xl font-bold text-[#143D95]"
          >
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Send a message and I will get back to you as soon as I can.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2">
        <Reveal className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="mt-1 text-xl text-[#143D95]" aria-hidden>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                className="h-5 w-5"
                viewBox="0 0 384 512"
              >
                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
              </svg>
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold">Location</h3>
              <p className="text-gray-400">{site.location}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="mt-1 text-xl text-[#143D95]" aria-hidden>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                className="h-5 w-5"
                viewBox="0 0 512 512"
              >
                <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
              </svg>
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold">Email</h3>
              <p className="text-gray-400">{site.email}</p>
            </div>
          </div>

          {site.phone ? (
            <div className="flex items-start space-x-4">
              <div className="mt-1 text-xl text-[#143D95]" aria-hidden>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  className="h-5 w-5"
                  viewBox="0 0 512 512"
                >
                  <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-xl font-bold">Phone</h3>
                <p className="text-gray-400">{site.phone}</p>
              </div>
            </div>
          ) : null}
        </Reveal>

        <Reveal delayMs={80}>
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label htmlFor="name" className="mb-2 block font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-700 bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex w-full items-center justify-center rounded-lg bg-[#143D95] px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
            >
              <SendIcon className="mr-2 h-4 w-4" />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-green-400" role="status">
                Message sent successfully.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400" role="alert">
                Failed to send message. Please try again.
              </p>
            )}
            {errorMessage && status === "idle" && (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
