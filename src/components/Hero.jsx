import { Fragment } from 'react'
import Image from "next/legacy/image"
import clsx from 'clsx'
import {Highlight, themes, defaultProps } from 'prism-react-renderer'

import { ButtonLink } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurLimeImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'

const codeLanguage = 'cpp'
const code = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
 
    return 0;
}`

const tabs = [
  { name: 'main.cpp', isActive: true },
  { name: 'main.h', isActive: false },
]

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:-mt-[4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:-mt-[4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:py-20 lg:px-0">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="absolute bottom-full right-full -mr-72 -mb-56 opacity-50">
              <Image
                src={blurLimeImage}
                alt=""
                layout="fixed"
                width={530}
                height={530}
                unoptimized
                priority
              />
            </div>
            <div className="relative">
              <p className="inline bg-gradient-to-r from-lime-200 via-lime-400 to-lime-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                C++ 编程知识库
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                高性能、通用的编程语言和工具链
              </p>
              <div className="mt-8 flex space-x-4 md:justify-center lg:justify-start">
                <ButtonLink href="/">快速开始</ButtonLink>
                <ButtonLink
                  href="https://github.com/hyperter96/cpp-docs"
                  variant="secondary"
                >
                  在GitHub查看
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -top-32 -bottom-48 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:left-[calc(50%+14rem)] lg:right-0 lg:-top-32 lg:-bottom-32 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 lg:-translate-y-[60%]" />
            </div>
            <div className="relative">
              <div className="absolute -top-64 -right-64">
                <Image
                  src={blurLimeImage}
                  alt=""
                  layout="fixed"
                  width={530}
                  height={530}
                  unoptimized
                  priority
                />
              </div>
              <div className="absolute -bottom-40 -right-44">
                <Image
                  src={blurIndigoImage}
                  alt=""
                  layout="fixed"
                  width={567}
                  height={567}
                  unoptimized
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-lime-300 via-lime-300/70 to-lime-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-lime-300 via-lime-300/70 to-lime-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#011627] ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-lime-300/0 via-lime-300/70 to-lime-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-lime-400/0 via-lime-400 to-lime-400/0" />
                <div className="pl-4 pt-4">
                  <svg
                    aria-hidden="true"
                    className="h-2.5 w-auto stroke-slate-500/30"
                    fill="none"
                  >
                    <circle cx="5" cy="5" r="4.5" />
                    <circle cx="21" cy="5" r="4.5" />
                    <circle cx="37" cy="5" r="4.5" />
                  </svg>
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx('flex h-6 rounded-full', {
                          'bg-gradient-to-r from-lime-400/30 via-lime-400 to-lime-400/30 p-px font-medium text-lime-300':
                            tab.isActive,
                          'text-slate-500': !tab.isActive,
                        })}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            { 'bg-slate-800': tab.isActive }
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm">
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString()}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={code}
                      language={codeLanguage}
                      theme={themes.nightOwl}
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={clsx(
                            className,
                            'flex overflow-x-auto pb-6'
                          )}
                          style={style}
                        >
                          <code className="px-4">
                            {tokens.map((line, index) => (
                              <div key={index} {...getLineProps({ line })}>
                                {line.map((token, index) => (
                                  <span
                                    key={index}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))}
                          </code>
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
