import { FaTelegramPlane } from 'react-icons/fa';

export default function TelegramButton() {
  const telegramUrl = 'https://t.me/nitazenechemicals';

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-4 items-end">
      <div className="group relative">
        <a
          href={telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-400 hover:to-blue-400 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:shadow-sky-500/50 relative"
          aria-label="Chat with us on Telegram"
        >
          <FaTelegramPlane className="text-3xl" aria-hidden="true" />

          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-75 pointer-events-none"></span>
        </a>

        {/* Tooltip - only appears on this button's hover */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-50 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with us on Telegram
        </span>
      </div>
    </div>
  );
}
