import { getNewFeedItems } from '@/getNewFeedItems'
import { getFeedList } from '@/getFeedList'
import { addFeedItems } from '@/addFeedItems'
import dotenv from 'dotenv'
dotenv.config()

async function index() {
  const feedList = await getFeedList()
  console.log('feedUrlList: ', feedList)
  await Promise.all(
    feedList.map(async (feed) => {
      const feedUrl = feed.url,
        feedName = feed.name,
        source = feed.source
      if (feedUrl) {
        try {
          const newFeedItems = await getNewFeedItems(feedUrl)
          console.log('newFeedItems: ', newFeedItems)
          await addFeedItems(newFeedItems, feedName, source)
        } catch (error) {
          // TODO: Provide some kind of notification to the user.
          console.error(error)
        }
      }
    })
  )
}

index()
