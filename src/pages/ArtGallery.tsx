import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Plus } from 'lucide-react';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  image: string;
  description: string;
  year: string;
  medium: string;
  dimensions: string;
}

const ArtworkModal = ({ artwork, onClose }: { artwork: Artwork; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90"
      style={{ zIndex: 10002 }}
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      <div 
        className="h-screen flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-[1600px] h-[80vh] flex gap-8">
          {/* Left side - Image */}
          <div className="flex-1 flex items-center justify-center bg-black/50 rounded-2xl overflow-hidden">
            <motion.img
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              src={artwork.image}
              alt={artwork.title}
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          </div>

          {/* Right side - Artwork details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-[400px] bg-white rounded-2xl p-8 overflow-y-auto"
          >
            <h2 className="text-4xl font-bold mb-2">{artwork.title}</h2>
            <p className="text-purple-600 mb-6">{artwork.artist}</p>
            <p className="text-gray-600 mb-8">{artwork.description}</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Year</h3>
                <p className="font-medium">{artwork.year}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Medium</h3>
                <p className="font-medium">{artwork.medium}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Dimensions</h3>
                <p className="font-medium">{artwork.dimensions}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SubmitArtworkModal = ({ onClose, onSubmit }: { onClose: () => void; onSubmit: (artwork: Artwork) => void }) => {
  const [newArtwork, setNewArtwork] = useState<Artwork>({
    id: Date.now(),
    title: '',
    artist: '',
    image: '',
    description: '',
    year: new Date().getFullYear().toString(),
    medium: '',
    dimensions: ''
  });

  const handleSubmit = () => {
    if (newArtwork.title && newArtwork.artist && newArtwork.image) {
      onSubmit(newArtwork);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90"
      style={{ zIndex: 10002 }}
      onClick={onClose}
    >
      <div 
        className="h-screen flex items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Submit Your Artwork</h2>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newArtwork.title}
                onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter artwork title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Artist Name
              </label>
              <input
                type="text"
                value={newArtwork.artist}
                onChange={(e) => setNewArtwork({ ...newArtwork, artist: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={newArtwork.image}
                onChange={(e) => setNewArtwork({ ...newArtwork, image: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newArtwork.description}
                onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                placeholder="Describe your artwork"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={newArtwork.year}
                  onChange={(e) => setNewArtwork({ ...newArtwork, year: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medium
                </label>
                <input
                  type="text"
                  value={newArtwork.medium}
                  onChange={(e) => setNewArtwork({ ...newArtwork, medium: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Medium used"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dimensions
                </label>
                <input
                  type="text"
                  value={newArtwork.dimensions}
                  onChange={(e) => setNewArtwork({ ...newArtwork, dimensions: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., 1920×1080 px"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Submit Artwork
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ArtGallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const savedArtworks = localStorage.getItem('art_gallery');
    return savedArtworks ? JSON.parse(savedArtworks) : [];
  });

  const handleSubmitArtwork = (artwork: Artwork) => {
    const updatedArtworks = [...artworks, artwork];
    setArtworks(updatedArtworks);
    localStorage.setItem('art_gallery', JSON.stringify(updatedArtworks));
  };

  return (
    <>
      <div className={`min-h-screen bg-[#F8F5F1] pt-20 ${selectedArtwork ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-light tracking-tighter"
            >
              Wall of Art
            </motion.h1>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Submit Artwork
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-white">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Eye className="w-8 h-8 text-white mb-2 mx-auto" />
                      <p className="text-white text-sm font-medium text-center">View Artwork</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">{artwork.title}</h3>
                  <p className="text-sm text-gray-600">{artwork.artist}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedArtwork && (
          <ArtworkModal
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
          />
        )}
        {isSubmitModalOpen && (
          <SubmitArtworkModal
            onClose={() => setIsSubmitModalOpen(false)}
            onSubmit={handleSubmitArtwork}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ArtGallery;