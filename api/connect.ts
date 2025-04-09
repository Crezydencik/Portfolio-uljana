import { MongoClient } from 'mongodb'

export default async function handler(req: any, res: any) {
  const uri = process.env.MONGO_URI

  if (!uri) {
    return res.status(500).json({ error: 'MongoDB URI is not defined' })
  }

  try {
    const client = await MongoClient.connect(uri)
    await client.db().admin().ping()
    res.status(200).json({ status: '✅ Connected to MongoDB' })
  } catch (err) {
    console.error('MongoDB connection failed:', err)
    res.status(500).json({ error: '❌ Failed to connect to MongoDB' })
  }
}
