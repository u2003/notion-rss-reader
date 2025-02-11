import { Client } from '@notionhq/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = any

export const getFeedList = async () => {
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const databaseId = process.env.NOTION_FEEDER_DATABASE_ID || ''

  const response = await notion.databases.query({
    database_id: databaseId,
  })

  const feedList = response.results.filter(
    (result: TODO) => result.properties.Enable.checkbox
  )

  return feedList.map((result: TODO) => {
    const properties = result.properties
    console.log('title: ', properties.Title.title[0]?.text.content || '')
    return {
      url: properties.Link?.url || ('' as string),
      name: properties.Title.title[0]?.text.content || ('' as string),
      source: {
        name: properties.Source.select?.name || '',
        color: properties.Source.select.color,
      } as { name: string; color: string },
    }
  })
}
