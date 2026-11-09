import { Fragment } from "react";

const Str = ({ children }) => <span className="text-[#f6c177]">&quot;{children}&quot;</span>;

/** A project's key facts printed as a little JS object — always on a dark "editor" panel. */
export default function CodeSpec({ spec }) {
  const entries = Object.entries(spec.fields);
  return (
    <div className="overflow-hidden rounded-2xl bg-[#0e0e10] text-[#e6e6e3] shadow-2xl ring-1 ring-white/10">
      <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-white/45">{spec.name}.js</span>
      </div>
      <pre className="whitespace-pre-wrap p-5 font-mono text-[12.5px] leading-7 sm:p-7 sm:text-[13.5px]">
        <code>
          <span className="block">
            <span className="text-[#c4a7e7]">export const</span> <span className="text-[#c8ff3e]">{spec.name}</span>{" "}
            <span className="text-white/45">=</span> {"{"}
          </span>
          {entries.map(([key, value]) => (
            <span key={key} className="block pl-5 sm:pl-6">
              <span className="text-[#9ccfd8]">{key}</span>
              <span className="text-white/45">: </span>
              {Array.isArray(value) ? (
                <>
                  [
                  {value.map((v, i) => (
                    <Fragment key={v}>
                      <Str>{v}</Str>
                      {i < value.length - 1 && <span className="text-white/45">, </span>}
                    </Fragment>
                  ))}
                  ]
                </>
              ) : (
                <Str>{value}</Str>
              )}
              <span className="text-white/45">,</span>
            </span>
          ))}
          <span className="block">{"};"}</span>
        </code>
      </pre>
    </div>
  );
}
