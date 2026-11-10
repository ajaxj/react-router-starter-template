type ShowCardProps = {
  show: {
    title: string;
    status: string;
    type: string;
    img: string;
  };
  showPlayButton?: boolean;
};

export default function ShowCard({ show, showPlayButton = true }: ShowCardProps) {
  return (
    <li className="p-1.5 sm:p-2.5">
      <a
        href="#"
        title={show.title}
        className="group relative block aspect-[5/7] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700"
      >
        <img
          src={show.img}
          alt={show.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {showPlayButton && (
          <span className="absolute inset-0 z-10 hidden items-center justify-center bg-black/10 group-hover:flex">
            <svg className="h-10 w-10 text-white/90 sm:h-12 sm:w-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}
        <span className="absolute right-1 top-1 z-20 rounded bg-black/60 px-1 py-0.5 text-[10px] text-white sm:text-xs">
          {show.type}
        </span>
        <span className="absolute bottom-0 left-0 z-20 w-full rounded-b-lg bg-gradient-to-t from-black/50 to-transparent px-2 py-1 text-center text-[10px] text-white sm:px-2.5 sm:py-1.5 sm:text-xs">
          {show.status}
        </span>
      </a>
      <h3 className="m-0 rounded-b-lg bg-[#f9f9f9] px-2 py-1 text-center dark:bg-gray-700 sm:px-4 sm:py-1.5">
        <a
          href="#"
          className="block truncate text-[11px] text-gray-700 hover:text-[#ef4444] dark:text-gray-200 dark:hover:text-red-400 sm:text-[13px]"
          title={show.title}
        >
          {show.title}
        </a>
      </h3>
    </li>
  );
}
