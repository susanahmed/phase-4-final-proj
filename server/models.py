from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-playlist_songs', '-playlists.songs')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)

    # playlist_songs = db.relationship('PlaylistSong', backref='song')
    # playlists = association_proxy('playlist_songs', 'playlist')

    def __repr__(self):
        return f'<Song {self.username}>'
    

class Profile(db.Model, SerializerMixin):
    __tablename__ = 'profiles'

    serialize_rules = ('-playlist_songs', '-songs.playlists')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    creator = db.Column(db.String, nullable=False)

    playlist_songs = db.relationship('PlaylistSong', backref='playlist')
    songs = association_proxy('playlist_songs', 'song')

    def __repr__(self):
        return f'<Playlist {self.title}>'
    
class PlaylistSong(db.Model, SerializerMixin):
    __tablename__ = 'playlist_songs'

    serialize_rules = ('-song.playlist_songs', '-song.playlists',
                       '-playlist.playlist_songs', '-playlist.songs')

    id = db.Column(db.Integer, primary_key=True)

    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'))
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'))

    def __repr__(self):
        return f'<PlaylistSong {self.user}>'