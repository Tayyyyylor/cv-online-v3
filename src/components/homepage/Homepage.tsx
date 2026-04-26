import { useTranslations } from 'next-intl'
import React from 'react'
import { LocaleSwitcher } from '../atoms/LocaleSwitcher'
import { ThemeToggle } from '../atoms/ThemeToggle'

export default function Homepage() {
    const t = useTranslations("Test")
  return (
    <div>
        <LocaleSwitcher />
        <ThemeToggle />
        <p>{t("hello")}</p></div>
  )
}
