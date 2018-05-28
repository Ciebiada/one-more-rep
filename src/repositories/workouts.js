import { db } from '../db'

export const create = () => {
  const now = new Date().toJSON()

  return db.put({
    _id: now,
    name: '',
    date: now
  })
}

export const remove = (workout) => {
  return db.remove(workout)
}

export const findAll = async ({ limit }) => {
  await db.createIndex({ index: { fields: ['date'] } })

  const { total_rows: totalRows } = await db.allDocs()
  const count = totalRows - 1

  const { docs: workouts } = await db.find({
    limit,
    selector: { date: { $gte: null } },
    sort: [{ date: 'desc' }]
  })

  return { workouts, count }
}

export const watch = (callback) => {
  return db.changes({
    since: 'now',
    live: true
  }).on('change', callback)
}
