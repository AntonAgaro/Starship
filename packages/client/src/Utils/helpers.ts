import { TAuthorInfo } from '../Redux/forum/types'
import { TProfileInfo } from '../Redux/user/types'

export const getDisplayProfileName = (
  profile: TProfileInfo | TAuthorInfo | undefined | null
) => {
  if (profile) {
    return (
      (profile?.display_name ? profile.display_name : profile.login) +
      (' ' + profile?.first_name ?? '') +
      (' ' + profile?.second_name ?? '')
    )
  } else {
    return ''
  }
}

export const getProfileAvatar = (
  profile: TProfileInfo | TAuthorInfo | undefined | null
) => {
  const placeholder = 'https://p-hold.com/200/blur'
  if (profile) {
    return profile.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${profile.avatar}`
      : placeholder
  } else {
    return placeholder
  }
}

export const num_per_page = 7
