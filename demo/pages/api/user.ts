import { NextApiRequest, NextApiResponse } from 'next'

// an endpoint for getting user info
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.cookies['swr-test-token'] === 'swr') {
    // authorized
    res.json({
      loggedIn: true,
      name: 'Uday Vunnam',
      avatar: 'https://github.com/udayvunnam.png',
    })
    return
  }

  res.json({
    loggedIn: false,
  })
}
