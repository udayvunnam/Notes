
import { NextApiRequest, NextApiResponse } from 'next'

let list = ['Item 1', 'Item 2', 'Item 3']

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.add) {
    if (!list.includes(req.query.add as string)) {
      list.push(req.query.add as string)
    }
  } else if (req.query.clear) {
    list = []
  }

  await new Promise(r => setTimeout(r, 100))

  res.json(list)
}
