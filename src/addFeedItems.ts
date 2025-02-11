import { Client } from '@notionhq/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = any

export const addFeedItems = async (
  newFeedItems: {
    [key: string]: TODO
  }[],
  feedName: string,
  source: { name: string; color: string }
) => {
  const notion = new Client({ auth: process.env.NOTION_KEY })
  const databaseId = process.env.NOTION_READER_DATABASE_ID || ''

  newFeedItems.forEach(async (item) => {
    const { title, link, isoDate, enclosure } = item
    const domain = link?.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/)
    const imgUrl = enclosure.url
    console.log('imgUrl: ', imgUrl)

    const properties: TODO = {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      URL: {
        url: link,
      },
      Domain: {
        select: {
          name: domain ? domain[1] : null,
        },
      },
      Feed: {
        rich_text: [
          {
            text: {
              content: feedName,
            },
          },
        ],
      },
      Source: {
        select: {
          name: source.name,
          color: source.color,
        },
      },
      'Created Time': {
        // 新增的属性
        date: {
          start: isoDate, // 使用isoDate的值
        },
      },
      'Image URL': {
        files: [
          {
            name: 'Image',
            external: {
              url: imgUrl,
            },
          },
        ],
      },
    }

    console.log('准备创建页面，属性:', properties)

    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties,
      })
      console.log('页面创建成功，响应:', response)
    } catch (error) {
      console.error(error)
    }
  })
}
