"use client"

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Camera,
  Sparkles,
  Download,
  CheckCircle,
  BarChart,
  Shield,
  Lightbulb,
  Timer,
  Users
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Dictionary } from '@/locales/en'

interface NewbornGuideTabsProps {
  dict: Dictionary
}

export function NewbornGuideTabs({ dict }: NewbornGuideTabsProps) {
  const samplePairsUrls = [
    { before: '/samples/color/newborn-original.jpg', after: '/samples/bw/newborn-bw.jpg' },
    { before: '/samples/color/newborn-family-original.jpg', after: '/samples/bw/newborn-family-bw.jpg' },
    { before: '/samples/color/newborn-wrap-original.jpg', after: '/samples/bw/newborn-wrap-bw.jpg' }
  ]
  const samplePairs = dict.newborn.samplePairs.map((pair: any, idx: number) => ({
    ...pair,
    ...samplePairsUrls[idx]
  }))

  const parentChecklist = dict.newborn.homeChecklist
  const lightingRecipes = dict.newborn.homeRecipes
  const lightingSets = dict.newborn.studioSets
  const deliveryMetrics = dict.newborn.studioDeliveryMetrics

  const workflowIcons = [Lightbulb, Camera, Timer, Users]
  const workflowStages = dict.newborn.studioTimeline.map((stage: any, idx: number) => ({
    ...stage,
    icon: workflowIcons[idx] || workflowIcons[0]
  }))

  return (
    <Tabs defaultValue="home">
      <TabsList className="grid grid-cols-2 mb-8 max-w-md mx-auto">
        <TabsTrigger value="home">
          <span className="flex items-center gap-2">
            {dict.newborn.tabHome}
          </span>
        </TabsTrigger>
        <TabsTrigger value="studio">
          <span className="flex items-center gap-2">
            {dict.newborn.tabStudio}
          </span>
        </TabsTrigger>
      </TabsList>

      {/* HOME SESSION CONTENT */}
      <TabsContent value="home" className="space-y-8">
        {/* Intro Card */}
        <Card className="p-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200 dark:border-pink-800">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-pink-600 dark:text-pink-300" />
                {dict.newborn.homeWhyTitle}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {dict.newborn.homeWhyDesc}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {dict.newborn.homeQuickStatsTitle}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {dict.newborn.homeQuickStats.map((stat: string) => (
                  <li key={stat} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 text-pink-600 mt-0.5" />
                    {stat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/60 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {dict.newborn.homeSampleTitle}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {dict.newborn.homeSampleDesc}
              </p>
              <Link href="/samples/bw/newborn-bw.jpg">
                <Button size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  {dict.newborn.homeSampleBtn}
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Before/After Examples */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            {dict.newborn.homeExamplesTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {samplePairs.map((pair: any) => (
              <Card key={pair.label} className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={pair.before}
                      alt={`${pair.label} color`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <span className="absolute bottom-2 left-2 text-xs font-semibold bg-white/80 px-2 py-1 rounded">
                      Color
                    </span>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                      src={pair.after}
                      alt={`${pair.label} B&W`}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    <span className="absolute bottom-2 left-2 text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded">
                      B&W
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{pair.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{pair.notes}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Parent Prep Checklist */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            {dict.newborn.homeChecklistTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {parentChecklist.map((block: any) => (
              <Card key={block.title} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{block.title}</h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {block.items.map((item: string) => (
                    <li key={item} className="flex items-start">
                      <span className="mt-1.5 mr-2 h-2 w-2 rounded-full bg-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Lighting Recipes */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            {dict.newborn.homeRecipesTitle}
          </h2>
          <div className="overflow-hidden rounded-xl border border-pink-200 dark:border-pink-800">
            <table className="min-w-full text-sm">
              <thead className="bg-pink-100 dark:bg-pink-900/40">
                <tr>
                  {dict.newborn.homeRecipesHeaders.map((header: string) => (
                    <th key={header} className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lightingRecipes.map((recipe: any, i: number) => (
                  <tr
                    key={recipe.name}
                    className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-pink-50 dark:bg-gray-900/60'}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{recipe.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{recipe.settings}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{recipe.setup}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{recipe.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href={`/${dict.locale || 'en'}/`}>
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
              <Camera className="w-4 h-4 mr-2" />
              {dict.newborn.homeCta}
            </Button>
          </Link>
        </div>
      </TabsContent>

      {/* STUDIO WORKFLOW CONTENT */}
      <TabsContent value="studio" className="space-y-8">
        {/* Studio Intro */}
        <Card className="p-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                {dict.newborn.studioStudyTitle}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {dict.newborn.studioStudyDesc}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/70 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {dict.newborn.studioPrivacyTitle}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {dict.newborn.studioPrivacyDesc}
              </p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4 mr-2" />
                {dict.newborn.studioPrivacyBadge}
              </div>
            </div>
          </div>
        </Card>

        {/* Lighting Sets */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            {dict.newborn.studioSetsTitle}
          </h2>
          <div className="space-y-6">
            {lightingSets.map((set: any) => (
              <Card key={set.title} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{set.title}</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong className="text-gray-900 dark:text-white">Camera:</strong> {set.gear}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">Setup:</strong> {set.setup}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong className="text-gray-900 dark:text-white">BWConverter:</strong> {set.preset}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">Result:</strong> {set.outcome}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            {dict.newborn.studioMetricsTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 bg-white dark:bg-gray-900">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart className="w-5 h-5 mr-2 text-blue-600" />
                {dict.newborn.studioDeliveryTitle}
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {deliveryMetrics.map(({ metric, value }: any) => (
                  <li
                    key={metric}
                    className="flex justify-between border-b border-blue-100 dark:border-blue-900 pb-2 last:border-b-0"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-200">{metric}</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {dict.newborn.studioTimelineTitle}
              </h3>
              <div className="space-y-4">
                {workflowStages.map((stage: any) => {
                  const Icon = stage.icon
                  return (
                    <div key={stage.title} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-blue-600">{stage.duration}</p>
                        <p className="text-sm text-gray-900 dark:text-white font-medium">{stage.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{stage.insight}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.newborn.studioCtaTitle}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {dict.newborn.studioCtaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${dict.locale || 'en'}/batch-black-and-white-converter`}>
              <Button size="lg">{dict.newborn.studioBtnLaunch}</Button>
            </Link>
            <Link href={`/${dict.locale || 'en'}/contact`}>
              <Button variant="outline" size="lg">
                {dict.newborn.studioBtnRequest}
              </Button>
            </Link>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
