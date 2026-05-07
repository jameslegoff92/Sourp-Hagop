import { defineMigration, at, patch, set } from 'sanity/migrate'

export default defineMigration({
  title: 'Copy existing fields into fr locale',
  documentTypes: ['careerPage'],

  async *migrate(documents) {
    for await (const doc of documents()) {
      const patches = []

      if (Array.isArray(doc.introText)) {
        patches.push(patch(doc._id, [
          at('introText', set({ fr: doc.introText, hy: [] }))
        ]))
      }

      if (typeof doc.applicationNote === 'string') {
        patches.push(patch(doc._id, [
          at('applicationNote', set({ fr: doc.applicationNote, hy: '' }))
        ]))
      }

      if (Array.isArray(doc.jobs)) {
        doc.jobs.forEach((job: any, jobIndex: number) => {

          if (typeof job.title === 'string') {
            patches.push(patch(doc._id, [
              at(`jobs[${jobIndex}].title`, set({ fr: job.title, hy: '' }))
            ]))
          }

          if (Array.isArray(job.shortDescription)) {
            patches.push(patch(doc._id, [
              at(`jobs[${jobIndex}].shortDescription`, set({ fr: job.shortDescription, hy: [] }))
            ]))
          }

          if (Array.isArray(job.sections)) {
            job.sections.forEach((section: any, sectionIndex: number) => {

              if (typeof section.customTitle === 'string') {
                patches.push(patch(doc._id, [
                  at(`jobs[${jobIndex}].sections[${sectionIndex}].customTitle`, set({ fr: section.customTitle, hy: '' }))
                ]))
              }

              if (Array.isArray(section.content)) {
                patches.push(patch(doc._id, [
                  at(`jobs[${jobIndex}].sections[${sectionIndex}].content`, set({ fr: section.content, hy: [] }))
                ]))
              }

            })
          }

        })
      }

      yield* patches
    }
  }
})