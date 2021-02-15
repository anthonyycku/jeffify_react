# Jeffify - Spotify Clone

![jeffify](https://i.imgur.com/njGq68u.png)

## Hello! Thanks for visiting my Spotify clone!

This is a 2-week project, aiming to showcase Spotify's unique style and its various features including search, playlists, and audio control.

### Technical Stack:

- React / Hooks
- Ruby on Rails
- PostgreSQL
- AWS S3

### Main features

- Audio control - Play/pause, repeat/skip, random, volume
- Search
- Playlists
- Queue
- Artist/album pages
- User signup/login to access playlists

### Database

Users
| id | serial |
| username | string |
| password | string |

Playlists
| id | serial |
| name | string |
| user_id | int |

UserPlaylists
| id | serial |
| song_id | int |
| playlist_id | int |

Songs
| id | serial |
| title | string |
| artist_id | int |
| album_id | int |
| audio | string |

Albums
| id | serial |
| name | string |
| image | string |
| year | int |
| artist_id | int |

Artists
| id | serial |
| name | string |
| image | string |
