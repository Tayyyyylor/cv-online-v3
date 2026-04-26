import { useTranslations } from 'next-intl'
import React from 'react'
import { LocaleSwitcher } from '../atoms/LocaleSwitcher'

export default function Homepage() {
    const t = useTranslations("Test")
  return (
    <div>
        <LocaleSwitcher />
        <p>{t("hello")}</p></div>
  )
}
