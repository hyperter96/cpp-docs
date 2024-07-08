import clsx from 'clsx'

import { Icon } from '@/components/Icon'

const styles = {
  note: {
    container:
      'bg-zinc-50 dark:bg-zinc-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-lime-900 dark:text-lime-400',
    body: 'text-lime-800 prose-code:text-lime-900 dark:text-slate-300 dark:prose-code:text-slate-300 prose-a:text-lime-900 [--tw-prose-background:theme(colors.lime.50)]',
  },
  warning: {
    container:
      'bg-lime-50 dark:bg-zinc-800/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-lime-900 dark:text-lime-500',
    body: 'text-lime-800 prose-code:text-lime-900 prose-a:text-lime-900 [--tw-prose-underline:theme(colors.lime.400)] dark:[--tw-prose-underline:theme(colors.lime.700)] [--tw-prose-background:theme(colors.lime.50)] dark:text-slate-300 dark:prose-code:text-slate-300',
  },
}

const icons = {
  note: (props) => <Icon icon="lightbulb" {...props} />,
  warning: (props) => <Icon icon="warning" color="lime" {...props} />,
}

export function Callout({ type = 'note', title, children }) {
  let IconComponent = icons[type]

  return (
    <div className={clsx('my-8 flex rounded-3xl p-6', styles[type].container)}>
      <IconComponent className="h-8 w-8 flex-none" />
      <div className="ml-4 flex-auto">
        <p className={clsx('m-0 font-display text-xl', styles[type].title)}>
          {title}
        </p>
        <div className={clsx('prose mt-2.5', styles[type].body)}>
          {children}
        </div>
      </div>
    </div>
  )
}
