import Parser from 'rss-parser'
import { timeDifference } from './helpers'

const parser = new Parser()

export const getNewFeedItems = async (feedUrl: string) => {
  const { items: newFeedItems } = await parser.parseURL(feedUrl)

  //updated: only parse the new feed items created today
  return newFeedItems.filter((feedItem) => {
    const { pubDate } = feedItem

    if (!pubDate) return false

    const publishedDate = new Date(pubDate).getTime() / 1000
    const { diffInHours } = timeDifference(publishedDate)
    return diffInHours === 0
  })
}

export default getNewFeedItems
