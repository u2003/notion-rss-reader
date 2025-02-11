import { getNewFeedItems } from '@/getNewFeedItems'
import { getFeedUrlList } from '@/getFeedUrlList'
import { addFeedItems } from '@/addFeedItems'
import dotenv from 'dotenv'
dotenv.config()

async function index() {
  const feedUrlList = await getFeedUrlList()
  console.log('feedUrlList: ', feedUrlList)
  feedUrlList.forEach(async (feedUrl: string) => {
    if (feedUrl) {
      try {
        const newFeedItems = await getNewFeedItems(feedUrl)
        console.log('newFeedItems: ', newFeedItems)
        await addFeedItems(newFeedItems)
      } catch (error) {
        // TODO: Provide some kind of notification to the user.
        console.error(error)
      }
    }
  })
}

index()
