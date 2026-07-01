import { useState } from 'react'
import Layout from '../../../components/Layout'
import KnowledgePage from '../../../components/KnowledgePage'
import { loadTranslations, useTranslation } from '../../../lib/i18n'

export async function getStaticProps() {
  return { props: { translations: loadTranslations('en', ['common']) } }
}

const META = {
  id:            '04',
  title:         'New to the U.S.? A complete tax guide for new immigrants',
  category:      'Individuals & Families',
  categoryHref:  '/library/individual',
  userEmotion:   'learning',
  difficulty:    'Beginner',
  readTime:      '8 min read',
  cpaReviewed:   true,
  updatedDate:   'June 2026',
  taxYear:       '2025',
  confidence:    'General principles apply to most new immigrants; dual-status years and treaty benefits require case-by-case analysis',
  persona:       ['New immigrant', 'F-1 student', 'H-1B visa holder', 'Green card holder (first year)', 'New U.S. resident'],
  relatedJourney: ['New to the U.S.', 'First-time filer'],
  actionRequired: 'Determine your tax residency status for the current year using the Substantial Presence Test — this is the single
