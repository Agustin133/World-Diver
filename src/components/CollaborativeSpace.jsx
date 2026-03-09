import React, { useState, useEffect } from 'react';
import { MessageCircle, Camera, Star, Send, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CollaborativeSpace = ({ destination }) => {
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('comments');
  const [comments, setComments] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (destination) {
      fetchComments();
      fetchPhotos();
      fetchRatings();
    }
  }, [destination]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/comments/destination/${destination._id}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/photos/destination/${destination._id}`);
      const data = await response.json();
      setPhotos(data.photos || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ratings/destination/${destination._id}`);
      const data = await response.json();
      setRatings(data.ratings || []);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const postComment = async () => {
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          destination: destination._id,
          content: newComment,
          type: 'general'
        })
      });

      if (response.ok) {
        setNewComment('');
        fetchComments();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (commentId) => {
    if (!isAuthenticated) return;

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/comments/${commentId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchComments();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const renderMasks = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((mask) => (
          <svg
            key={mask}
            className={`w-5 h-5 ${mask <= rating ? 'text-ocean-blue' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('comments')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'comments'
              ? 'text-ocean-blue border-b-2 border-ocean-blue'
              : 'text-gray-600 hover:text-ocean-blue'
          }`}
        >
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Comentarios ({comments.length})
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'photos'
              ? 'text-ocean-blue border-b-2 border-ocean-blue'
              : 'text-gray-600 hover:text-ocean-blue'
          }`}
        >
          <Camera className="w-4 h-4 inline mr-2" />
          Fotos ({photos.length})
        </button>
        <button
          onClick={() => setActiveTab('ratings')}
          className={`flex-1 py-3 px-4 font-semibold transition-colors ${
            activeTab === 'ratings'
              ? 'text-ocean-blue border-b-2 border-ocean-blue'
              : 'text-gray-600 hover:text-ocean-blue'
          }`}
        >
          <Star className="w-4 h-4 inline mr-2" />
          Calificaciones ({ratings.length})
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'comments' && (
          <div className="space-y-4">
            {/* New comment */}
            {isAuthenticated ? (
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ocean-blue focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && postComment()}
                />
                <button
                  onClick={postComment}
                  disabled={loading || !newComment.trim()}
                  className="px-4 py-2 bg-ocean-blue text-white rounded-lg hover:bg-ocean-teal transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="bg-blue-50 p-3 rounded-lg text-center text-sm text-gray-600 mb-4">
                Inicia sesión para comentar
              </div>
            )}

            {/* Comments list */}
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No hay comentarios aún</p>
                <p className="text-sm">Sé el primero en comentar</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="border-b border-gray-100 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">{comment.user?.name}</p>
                        {comment.user?.membershipPlan === 'premium' && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mt-1">{comment.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <button
                          onClick={() => toggleLike(comment._id)}
                          className="flex items-center gap-1 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${comment.likes?.some(like => like.toString() === user?._id?.toString()) ? 'fill-red-500 text-red-500' : ''}`} />
                          {comment.likes?.length || 0}
                        </button>
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'photos' && (
          <div>
            {photos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Camera className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No hay fotos aún</p>
                <p className="text-sm">Sé el primero en compartir una foto</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo) => (
                  <div key={photo._id} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {isAuthenticated && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">
                  <Camera className="w-4 h-4 inline mr-1" />
                  Próximamente: Sube tus fotos de buceo
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className="space-y-4">
            {ratings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Star className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No hay calificaciones aún</p>
                <p className="text-sm">Sé el primero en calificar este destino</p>
              </div>
            ) : (
              ratings.map((rating) => (
                <div key={rating._id} className="border-b border-gray-100 pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{rating.user?.name}</p>
                      {renderMasks(rating.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {rating.review && (
                    <p className="text-gray-700 text-sm">{rating.review}</p>
                  )}
                </div>
              ))
            )}
            {isAuthenticated && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg text-center">
                <p className="text-sm text-gray-600">
                  <Star className="w-4 h-4 inline mr-1" />
                  Próximamente: Califica este destino
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborativeSpace;
