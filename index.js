const workspaceOptions = [
  { id: 22, value: '臺北 Taipei', order: 1 },
  { id: 23, value: '新竹 Hsinchu', order: 2 },
  { id: 24, value: '臺中 Taichung', order: 3 },
  { id: 25, value: '高雄 Kaohsiung', order: 4 },
  { id: 26, value: '海外 Oversea', order: 5 },
  { id: 381, value: '新加坡 Singapore', order: 6 },
  { id: 382, value: '德國 Germany', order: 7 }
]

const wpid = ['24', '381', '']

function test() {
  if (Array.isArray(wpid) && wpid.length > 0) {
    return wpid
      .map(itemId => {
        const option = workspaceOptions.find(({ id }) => id == itemId)
        return option ? option.value : null
      })
      .filter(value => value)
      .join('、')
  }

  return ''
}

console.log(test())
