import Parser from 'rss-parser'

const parser = new Parser()

export const getNewFeedItems = async (feedUrl: string) => {
  const { items: newFeedItems } = await parser.parseURL(feedUrl)

  // parse all the feed items that are created earlier than today for the first time
  return newFeedItems
}
