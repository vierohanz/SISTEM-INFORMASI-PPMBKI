import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

// Hook untuk carousel slide per-item dengan looping
const useCarousel = (totalItems, animationDuration = 400) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCurrentIndex(prev => {
      // Hitung batas maksimal dimana card terakhir masih terlihat
      // Dengan asumsi 3 card terlihat sekaligus, maka maksimal index = totalItems - 3
      const maxIndex = Math.max(0, totalItems - 3);
      
      // Jika sudah mencapai batas maksimal, kembali ke 0
      if (prev >= maxIndex) {
        return 0;
      }
      
      return prev + 1;
    });

    setTimeout(() => setIsAnimating(false), animationDuration);
  }, [isAnimating, totalItems, animationDuration]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    setCurrentIndex(prev => {
      // Jika di index 0, pergi ke posisi maksimal
      if (prev <= 0) {
        return Math.max(0, totalItems - 3);
      }
      
      return prev - 1;
    });

    setTimeout(() => setIsAnimating(false), animationDuration);
  }, [isAnimating, totalItems, animationDuration]);

  return { currentIndex, isAnimating, next, prev };
};

// Hook untuk mengambil data artikel dari API
const useArtikelAPI = () => {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtikel = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Mengambil 6 artikel terbaru
      const response = await fetch('/article/latest');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform data API ke format yang dibutuhkan komponen
      const transformedData = data.map(item => ({
        id: item.id,
        judul: item.title || item.judul || 'Judul tidak tersedia',
        subjudul: item.subtitle || item.subjudul || 'Subjudul tidak tersedia',
        deskripsi: item.description || item.deskripsi || 'Deskripsi tidak tersedia',
        tanggal: item.date || item.tanggal || new Date().toLocaleDateString('id-ID', { 
          month: 'long', 
          year: 'numeric' 
        }),
        divisi: item.division || item.divisi || 'Divisi Umum',
        gambarKiri: item.image || item.gambarKiri || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
        gambarKanan: item.imageRight || item.gambarKanan || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=300&fit=crop',
        slug: item.slug || `artikel-${item.id}`
      }));
      
      setArtikel(transformedData);
    } catch (err) {
      console.error('Error fetching artikel:', err);
      setError(err.message);
      
      // Fallback ke data sample jika API gagal
      setArtikel(getSampleData());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArtikel();
  }, [fetchArtikel]);

  return { artikel, loading, error, refetch: fetchArtikel };
};

// Data sample untuk fallback/testing
const getSampleData = () => [
  { 
    id: 1, 
    judul: 'BKI BANGGA', 
    subjudul: 'Pengalaman dan prestasi santri', 
    deskripsi: 'Santri Bina Khoirul Insan berhasil menorehkan prestasi hingga tingkat internasional. Berikut kisah lengkapnya.', 
    tanggal: 'Juli 2025', 
    divisi: 'Divisi Humet', 
    gambarKiri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', 
    gambarKanan: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=300&fit=crop', 
    slug: 'apa-kata-sesepuh-2025' 
  },
  { 
    id: 2, 
    judul: 'OSAKA 2024', 
    subjudul: 'Suasana awal perkenalan ppm', 
    deskripsi: 'Rangkaian kegiatan OSAKA bagi santri baru tahun 2024 penuh semangat dan kebersamaan.', 
    tanggal: 'Juli 2025', 
    divisi: 'Divisi Humet', 
    gambarKiri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', 
    gambarKanan: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=300&fit=crop', 
    slug: 'masa-taaruf-2025' 
  },
  { 
    id: 3, 
    judul: 'Santri dan Literasi Digital', 
    subjudul: 'Langkah menuju moderasi', 
    deskripsi: 'Program literasi digital mendidik santri untuk lebih bijak dan cakap dalam menggunakan teknologi.', 
    tanggal: 'Juli 2025', 
    divisi: 'Divisi Pendidikan', 
    gambarKiri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop', 
    gambarKanan: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=200&h=300&fit=crop', 
    slug: 'santri-literasi-digital' 
  },
  { 
    id: 4, 
    judul: 'Bawakdehel Bah', 
    subjudul: 'Langkah menuju brainrot', 
    deskripsi: 'Program tungtung sahur digital mendidik santri untuk lebih bijak dan cakap dalam menggunakan teknologi.', 
    tanggal: 'Juli 2025', 
    divisi: 'Divisi Jawa', 
    gambarKiri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop', 
    gambarKanan: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=200&h=300&fit=crop', 
    slug: 'bawakdehel-bah' 
  },
  { 
    id: 5, 
    judul: 'Kegiatan Pramuka', 
    subjudul: 'Membangun karakter santri', 
    deskripsi: 'Kegiatan pramuka di pesantren mengajarkan kedisiplinan dan kepemimpinan kepada para santri.', 
    tanggal: 'Juli 2025', 
    divisi: 'Divisi Kegiatan', 
    gambarKiri: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop', 
    gambarKanan: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?w=200&h=300&fit=crop', 
    slug: 'kegiatan-pramuka' 
  },
  { 
    id: 6, 
    judul: 'Pertukaran Budaya', 
    subjudul: 'Menjelajahi keberagaman', 
    deskripsi: 'Program pertukaran budaya antar santri dari berbagai daerah untuk mempererat persaudaraan.', 
    tanggal: 'Juli 2025', 
    divisi: 'Divisi Budaya', 
    gambarKiri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop', 
    gambarKanan: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=200&h=300&fit=crop', 
    slug: 'pertukaran-budaya' 
  }
];

// Komponen untuk menampilkan fallback image
const FallbackImage = ({ className, alt }) => (
  <div className={`${className} bg-gray-200 flex items-center justify-center`}>
    <div className="text-gray-400 text-center">
      <AlertCircle size={24} className="mx-auto mb-2" />
      <span className="text-xs">Gambar tidak tersedia</span>
    </div>
  </div>
);

// Komponen image dengan fallback
const ImageWithFallback = ({ src, alt, className, fallbackClassName }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  if (imageError) {
    return <FallbackImage className={fallbackClassName || className} alt={alt} />;
  }

  return (
    <div className="relative">
      {imageLoading && (
        <div className={`${className} bg-gray-200 flex items-center justify-center absolute inset-0`}>
          <Loader2 className="animate-spin text-gray-400" size={20} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

// Komponen kartu artikel
const ArtikelCard = ({ artikel, onClick }) => (
  <div
    className="w-95 h-95 flex-shrink-0"
    onClick={() => onClick(artikel.slug)}
  >
    <div className="mt-5 bg-white rounded-xl shadow-lg overflow-visible cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:z-10 relative h-full flex flex-col">
      <div className="relative h-56 flex rounded-t-xl overflow-hidden flex-shrink-0">
        <div className="flex-[2] overflow-hidden">
          <ImageWithFallback
            src={artikel.gambarKiri}
            alt={`${artikel.judul} kiri`}
            className="ml-3 mt-3 w-58 h-50 bg-white rounded-xl object-cover transition-transform duration-500 hover:scale-110"
            fallbackClassName="ml-3 mt-3 w-58 h-50 bg-gray-200 rounded-xl"
          />
        </div>
        <div className="flex-[1]">
          <ImageWithFallback
            src={artikel.gambarKanan}
            alt={`${artikel.judul} kanan`}
            className="mt-3 absolute right-3 w-27 h-50 rounded-xl object-cover transition-transform duration-500 hover:scale-110 hover:z-10"
            fallbackClassName="mt-3 absolute right-3 w-27 h-50 rounded-xl bg-gray-200"
          />
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-sm font-bold text-gray-800 mb-1 hover:text-green-600 transition-colors duration-300 line-clamp-2">
          {artikel.judul}
        </h3>
        <p className="text-gray-600 mb-2 text-xs line-clamp-1">{artikel.subjudul}</p>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed flex-1">
          {artikel.deskripsi}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="text-xs text-gray-500 flex-1 mr-2">
            <div className="truncate">
              <span className="font-medium">{artikel.divisi}</span>
              <span className="mx-1">-</span>
              <span>{artikel.tanggal}</span>
            </div>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              onClick(artikel.slug);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 flex-shrink-0"
          >
            Lihat
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Komponen loading skeleton
const LoadingSkeleton = () => (
  <div className="w-95 h-95 flex-shrink-0">
    <div className="mt-5 bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col animate-pulse">
      <div className="relative h-56 flex rounded-t-xl overflow-hidden flex-shrink-0">
        <div className="flex-[2] overflow-hidden">
          <div className="ml-3 mt-3 w-58 h-50 bg-gray-300 rounded-xl"></div>
        </div>
        <div className="flex-[1]">
          <div className="mt-3 absolute right-3 w-27 h-50 rounded-xl bg-gray-300"></div>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded mb-1"></div>
        <div className="h-3 bg-gray-300 rounded mb-3 w-2/3"></div>
        <div className="flex justify-between items-center mt-auto">
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-12"></div>
        </div>
      </div>
    </div>
  </div>
);

// Tombol navigasi carousel
const NavButton = ({ direction, onClick, disabled }) => {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  const isNext = direction === 'next';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-12 h-12 rounded-full border-2 flex items-center justify-center
        transition-all duration-300 transform hover:scale-110 active:scale-95
        ${isNext
          ? 'bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600 hover:shadow-lg'
          : 'border-green-300 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 hover:shadow-lg'}
        ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none' : ''}
      `}
    >
      <Icon size={20} />
    </button>
  );
};

// Komponen error state
const ErrorState = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center h-110 text-center">
    <AlertCircle size={48} className="text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      Gagal memuat artikel
    </h3>
    <p className="text-gray-600 mb-4">
      {error}
    </p>
    <button
      onClick={onRetry}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
    >
      Coba Lagi
    </button>
  </div>
);

// Komponen utama artikel
const ArtikelTerkini = () => {
  // Konstanta untuk ukuran card dan spacing
  const CARD_WIDTH = 380; // w-95 = 23.75rem = 380px
  const CARD_SPACING = 40; // gap-10 = 2.5rem = 40px
  const CARD_WITH_SPACING = CARD_WIDTH + CARD_SPACING; // Total jarak per card
  
  const containerRef = useRef(null);
  const { artikel, loading, error, refetch } = useArtikelAPI();

  const handleArtikelClick = useCallback(slug => {
    window.location.href = `/artikel/${slug}`;
  }, []);

  const handleKunjungiLebihLanjut = useCallback(() => {
    window.location.href = '/artikel';
  }, []);

  const { currentIndex, isAnimating, next, prev } = useCarousel(artikel.length, 400);

  // Tentukan apakah menggunakan carousel atau grid statis
  const isCarouselMode = artikel.length >= 3;

  // Render loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Artikel Berita</h1>
              <h2 className="text-4xl font-bold text-gray-800">Bulan Ini!</h2>
            </div>
            <div className="bg-gray-300 animate-pulse rounded-full h-12 w-48"></div>
          </div>

          {/* Loading Skeletons */}
          <div className="relative overflow-hidden mb-1 h-110 px-7">
            <div className="flex gap-10">
              {[1, 2, 3].map(i => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Loading Navigation */}
          <div className="flex justify-center items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && artikel.length === 0) {
    return (
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Artikel Berita</h1>
              <h2 className="text-4xl font-bold text-gray-800">Bulan Ini!</h2>
            </div>
            <button
              onClick={handleKunjungiLebihLanjut}
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Kunjungi Lebih Lanjut
            </button>
          </div>

          <ErrorState error={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Artikel Berita</h1>
            <h2 className="text-4xl font-bold text-gray-800">Bulan Ini!</h2>
          </div>
          <button
            onClick={handleKunjungiLebihLanjut}
            className="bg-green-500 hover:bg-green-600 text-white px-10 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Kunjungi Lebih Lanjut
          </button>
        </div>

        {/* Artikel Container */}
        {artikel.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-110 text-center">
            <AlertCircle size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Belum ada artikel
            </h3>
            <p className="text-gray-500">
              Artikel akan ditampilkan di sini setelah dipublikasikan
            </p>
          </div>
        ) : isCarouselMode ? (
          /* Carousel Mode - untuk 3+ artikel */
          <div 
            ref={containerRef}
            className="relative overflow-hidden mb-1 h-110 px-7"
          >
            <div
              className="flex gap-10 transition-transform duration-400 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * CARD_WITH_SPACING}px)`,
              }}
            >
              {artikel.map(artikelItem => (
                <ArtikelCard key={artikelItem.id} artikel={artikelItem} onClick={handleArtikelClick} />
              ))}
            </div>
          </div>
        ) : (
          /* Static Grid Mode - untuk 1-2 artikel */
          <div className="flex justify-center items-center mb-8 h-110">
            <div className="flex gap-10">
              {artikel.map(artikelItem => (
                <ArtikelCard key={artikelItem.id} artikel={artikelItem} onClick={handleArtikelClick} />
              ))}
            </div>
          </div>
        )}

        {/* Navigasi - selalu tampil */}
        <div className="flex justify-center items-center gap-4">
          <NavButton 
            direction="prev" 
            onClick={prev} 
            disabled={isAnimating || !isCarouselMode} 
          />
          <NavButton 
            direction="next" 
            onClick={next} 
            disabled={isAnimating || !isCarouselMode} 
          />
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hover\\:z-10:hover {
          z-index: 10;
        }
        .hover\\:scale-112:hover {
          transform: scale(1.12);
        }
        .hover\\:scale-119:hover {
          transform: scale(1.19);
        }
      `}</style>
    </div>
  );
};

export default ArtikelTerkini;