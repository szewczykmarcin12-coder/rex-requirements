import React, { useState } from 'react';
import { Home, Folder, Bell, Settings, Search, ChevronLeft, FileText, ChevronRight, Menu, Lock, Plus, Trash2, Edit3, X, Upload, Save, LogOut, User, Shield } from 'lucide-react';

// Ikona Rex Concepts - trzy faliste linie (para/ciepło)
const RexLogo = ({ size = 24, color = '#FFBF99' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M8 6C8 6 10 8 10 12C10 16 8 18 8 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 4C12 4 14.5 7 14.5 12C14.5 17 12 20 12 20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 6C16 6 18 8 18 12C18 16 16 18 16 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Początkowa struktura katalogów
const initialCatalogData = {
  root: [
    { id: 'ampos', name: 'AMPOS', type: 'folder' },
    { id: 'brand-manual', name: 'BRAND MANUAL', type: 'folder' },
    { id: 'przewodnik-nowi', name: 'PRZEWODNIK DLA NOWYCH PRACOWNIKÓW', type: 'folder' },
    { id: 'wiedza-rex', name: 'WIEDZA O REX CONCEPTS', type: 'folder' },
    { id: 'obsluga-gosci', name: 'OBSŁUGA GOŚCI', type: 'folder' },
    { id: 'food-safety', name: 'FOOD SAFETY', type: 'folder' },
    { id: 'standardy', name: 'STANDARDY', type: 'folder' },
    { id: 'produkty', name: 'PRODUKTY', type: 'folder' },
    { id: 'lto', name: 'LTO', type: 'folder' },
    { id: 'delivery', name: 'DELIVERY', type: 'folder' },
  ],
  
  'brand-manual': [
    { id: 'wiedza-rex-sub', name: 'WIEDZA O REX CONCEPTS', type: 'folder' },
    { id: 'zarzadzanie-restauracja', name: 'ZARZĄDZANIE RESTAURACJĄ', type: 'folder' },
    { id: 'obszar-people', name: 'OBSZAR PEOPLE', type: 'folder' },
    { id: 'obszar-product', name: 'OBSZAR PRODUCT', type: 'folder' },
    { id: 'obszar-facility', name: 'OBSZAR FACILITY', type: 'folder' },
  ],
  
  'przewodnik-nowi': [
    { id: 'twoja-praca', name: 'TWOJA PRACA', type: 'file' },
    { id: 'urlopy-zwolnienia', name: 'URLOPY I ZWOLNIENIA', type: 'file' },
    { id: 'twoj-rozwoj', name: 'TWÓJ ROZWÓJ', type: 'file' },
    { id: 'twoje-benefity', name: 'TWOJE BENEFITY', type: 'file' },
  ],
  
  'wiedza-rex': [
    { id: 'o-firmie', name: 'O FIRMIE REX CONCEPTS', type: 'file' },
    { id: 'historia', name: 'HISTORIA FIRMY', type: 'file' },
    { id: 'misja-wizja', name: 'MISJA I WIZJA', type: 'file' },
  ],
  
  'obsluga-gosci': [
    { id: 'standardy-obslugi', name: 'STANDARDY OBSŁUGI', type: 'file' },
    { id: 'upselling', name: 'UPSELLING', type: 'file' },
    { id: 'reklamacje', name: 'OBSŁUGA REKLAMACJI', type: 'file' },
  ],
  
  'food-safety': [
    { id: 'haccp', name: 'HACCP', type: 'file' },
    { id: 'higiena', name: 'HIGIENA', type: 'file' },
    { id: 'alergeny', name: 'ALERGENY', type: 'file' },
  ],
  
  'standardy': [
    { id: 'przechowywanie', name: 'PRZECHOWYWANIE PRODUKTÓW', type: 'file' },
    { id: 'przygotowanie', name: 'PRZYGOTOWANIE PRODUKTÓW', type: 'file' },
  ],
  
  'produkty': [],
  'ampos': [],
  
  'lto': [
    { id: 'aktualne-promocje', name: 'AKTUALNE PROMOCJE', type: 'file' },
  ],
  
  'delivery': [
    { id: 'procedury-delivery', name: 'PROCEDURY DELIVERY', type: 'file' },
  ],
};

const sectionTitles = {
  'root': 'Dokumenty',
  'brand-manual': 'BRAND MANUAL',
  'przewodnik-nowi': 'PRZEWODNIK DLA NOWYCH PRACOWNIKÓW',
  'wiedza-rex': 'WIEDZA O REX CONCEPTS',
  'obsluga-gosci': 'OBSŁUGA GOŚCI',
  'food-safety': 'FOOD SAFETY',
  'standardy': 'STANDARDY',
  'produkty': 'PRODUKTY',
  'ampos': 'AMPOS',
  'lto': 'LTO',
  'delivery': 'DELIVERY',
};

// Demo użytkownicy
const USERS = {
  admin: { password: 'admin', role: 'admin', name: 'Administrator' },
  user: { password: 'user', role: 'user', name: 'Użytkownik' },
};

function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // App state
  const [activeTab, setActiveTab] = useState('home');
  const [currentPath, setCurrentPath] = useState(['root']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [catalogData, setCatalogData] = useState(initialCatalogData);
  
  // Admin modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('folder');
  const [itemToDelete, setItemToDelete] = useState(null);

  const currentSection = currentPath[currentPath.length - 1];
  const items = catalogData[currentSection] || [];
  const isAdmin = currentUser?.role === 'admin';

  // Login handler
  const handleLogin = () => {
    const user = USERS[loginEmail.toLowerCase()];
    if (user && user.password === loginPin) {
      setCurrentUser({ ...user, username: loginEmail });
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Nieprawidłowy login lub PIN');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPin('');
    setActiveTab('home');
    setCurrentPath(['root']);
  };

  // Navigation
  const navigateToFolder = (folderId) => {
    if (catalogData[folderId] !== undefined) {
      setCurrentPath([...currentPath, folderId]);
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const goHome = () => {
    setCurrentPath(['root']);
    setActiveTab('home');
  };

  // Admin functions
  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    
    const newId = newItemName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-ąćęłńóśźż]/g, '') + '-' + Date.now();
    const newItem = {
      id: newId,
      name: newItemName.toUpperCase(),
      type: newItemType,
    };
    
    setCatalogData(prev => {
      const updated = { ...prev };
      updated[currentSection] = [...(updated[currentSection] || []), newItem];
      if (newItemType === 'folder') {
        updated[newId] = [];
      }
      return updated;
    });
    
    setShowAddModal(false);
    setNewItemName('');
    setNewItemType('folder');
  };

  const handleEditItem = () => {
    if (!editingItem || !newItemName.trim()) return;
    
    setCatalogData(prev => {
      const updated = { ...prev };
      updated[currentSection] = updated[currentSection].map(item =>
        item.id === editingItem.id ? { ...item, name: newItemName.toUpperCase() } : item
      );
      return updated;
    });
    
    setShowEditModal(false);
    setEditingItem(null);
    setNewItemName('');
  };

  const handleDeleteItem = () => {
    if (!itemToDelete) return;
    
    setCatalogData(prev => {
      const updated = { ...prev };
      updated[currentSection] = updated[currentSection].filter(item => item.id !== itemToDelete.id);
      if (itemToDelete.type === 'folder' && updated[itemToDelete.id]) {
        delete updated[itemToDelete.id];
      }
      return updated;
    });
    
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setNewItemName(item.name);
    setShowEditModal(true);
  };

  const openDeleteConfirm = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  // Search
  const getFilteredItems = () => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase();
    const allItems = [];
    Object.values(catalogData).forEach(sectionItems => {
      if (Array.isArray(sectionItems)) {
        sectionItems.forEach(item => {
          if (item.name.toLowerCase().includes(query)) {
            allItems.push(item);
          }
        });
      }
    });
    return allItems.slice(0, 20);
  };

  const displayItems = searchQuery ? getFilteredItems() : items;

  // ==================== LOGIN SCREEN ====================
  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-md mx-auto h-screen flex flex-col bg-rex-dark">
        {/* Logo section */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-rex-blue">
            <RexLogo size={36} color="white" />
          </div>
          <h1 className="text-white text-2xl font-semibold mb-12">Rex Concepts</h1>
          
          {/* Login card */}
          <div className="w-full bg-white rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Lock size={20} color="#395185" />
              <span className="text-gray-800 font-semibold text-lg">Zaloguj się</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1.5">Login</label>
                <input
                  type="text"
                  placeholder="Login"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-gray-600 text-sm mb-1.5">PIN</label>
                <input
                  type="password"
                  placeholder="••••"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-800"
                />
              </div>
              
              {loginError && (
                <p className="text-red-500 text-sm text-center">{loginError}</p>
              )}
              
              <button
                onClick={handleLogin}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] bg-rex-blue"
              >
                Zaloguj się
              </button>
              
              <p className="text-center text-gray-400 text-xs mt-4">
                Połączenie szyfrowane
              </p>
            </div>
          </div>
          
          {/* Demo credentials hint */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs mb-2">Demo:</p>
            <p className="text-gray-400 text-xs">Admin: admin / admin</p>
            <p className="text-gray-400 text-xs">User: user / user</p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN APP ====================
  return (
    <div className="w-full max-w-md mx-auto h-screen flex flex-col" style={{ backgroundColor: '#F5F5F7' }}>
      
      {/* Header */}
      <header className="bg-rex-dark px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentPath.length > 1 ? (
            <button 
              onClick={navigateBack}
              className="p-1 -ml-1 rounded-lg transition-colors hover:bg-white/10"
            >
              <ChevronLeft size={24} color="white" />
            </button>
          ) : (
            <RexLogo size={28} color="#FFBF99" />
          )}
          <span className="text-white font-medium text-lg truncate max-w-[200px]">
            {currentPath.length > 1 ? sectionTitles[currentSection] || currentSection : 'Re(x)quirements'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isAdmin && (
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-rex-peach text-rex-dark">
              Admin
            </div>
          )}
          <button 
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg transition-colors hover:bg-white/10"
          >
            <Menu size={22} color="white" />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      {showSearch && (
        <div className="bg-rex-dark px-4 pb-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj dokumentów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Admin Add Button */}
      {isAdmin && activeTab === 'home' && (
        <div className="px-4 pt-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 bg-rex-peach text-rex-dark"
          >
            <Plus size={18} />
            Dodaj nowy element
          </button>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4">
        
        {activeTab === 'home' && (
          <div className="space-y-3">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
                style={{ borderLeft: `4px solid ${item.type === 'folder' ? '#395185' : '#FFBF99'}` }}
              >
                <button
                  onClick={() => item.type === 'folder' ? navigateToFolder(item.id) : null}
                  className="flex-1 flex items-center gap-4"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.type === 'folder' ? '#F0F4FF' : '#FFF5EE' }}
                  >
                    {item.type === 'folder' ? (
                      <Folder size={20} color="#395185" />
                    ) : (
                      <FileText size={20} color="#FFBF99" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <span className="text-gray-800 font-medium text-sm leading-tight block truncate">
                      {item.name}
                    </span>
                    <span className="text-gray-400 text-xs mt-0.5 block">
                      {item.type === 'folder' ? 'Folder' : 'Dokument PDF'}
                    </span>
                  </div>
                </button>
                
                {isAdmin ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Edit3 size={16} color="#6B7280" />
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(item)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </button>
                  </div>
                ) : (
                  <ChevronRight size={18} color="#CBD5E1" />
                )}
              </div>
            ))}
            
            {displayItems.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <Folder size={48} color="#CBD5E1" className="mx-auto mb-3" />
                <p className="text-gray-500 font-medium mb-1">Folder jest pusty</p>
                {isAdmin && (
                  <p className="text-gray-400 text-sm">Dodaj nowy element używając przycisku powyżej</p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm" style={{ borderLeft: '4px solid #FFBF99' }}>
            <Bell size={48} color="#FFBF99" className="mx-auto mb-3 opacity-50" />
            <p className="text-gray-800 font-medium mb-1">Brak powiadomień</p>
            <p className="text-gray-400 text-sm">Nie masz żadnych nowych powiadomień</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-3">
            {/* User info card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ borderLeft: '4px solid #395185' }}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: isAdmin ? '#FFF5EE' : '#F0F4FF' }}
                >
                  {isAdmin ? <Shield size={24} color="#FFBF99" /> : <User size={24} color="#395185" />}
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">{currentUser?.name}</p>
                  <p className="text-gray-400 text-sm">
                    {isAdmin ? 'Administrator' : 'Użytkownik'}
                  </p>
                </div>
              </div>
            </div>
            
            {[
              { label: 'Rex Concepts - PL', subtitle: 'Aktualna organizacja' },
              { label: 'Język', subtitle: 'Polski' },
              { label: 'O aplikacji', subtitle: 'Re(x)quirements v1.0.0' },
              { label: 'Pomoc', subtitle: 'Centrum pomocy' },
            ].map((item, index) => (
              <button
                key={index}
                className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-left">
                  <span className="text-gray-800 font-medium text-sm block">{item.label}</span>
                  <span className="text-gray-400 text-xs">{item.subtitle}</span>
                </div>
                <ChevronRight size={18} color="#CBD5E1" />
              </button>
            ))}
            
            <button
              onClick={handleLogout}
              className="w-full rounded-2xl p-4 font-medium text-sm shadow-sm transition-all hover:opacity-90 flex items-center justify-center gap-2 bg-rex-peach text-rex-dark"
            >
              <LogOut size={18} />
              Wyloguj się
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 px-6 py-2 flex justify-around items-center">
        <button
          onClick={goHome}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all"
        >
          <Home 
            size={22} 
            color={activeTab === 'home' ? '#395185' : '#9CA3AF'}
            strokeWidth={activeTab === 'home' ? 2.5 : 2}
          />
          <span 
            className="text-xs font-medium"
            style={{ color: activeTab === 'home' ? '#395185' : '#9CA3AF' }}
          >
            Home
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('notifications'); setCurrentPath(['root']); }}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all"
        >
          <Bell 
            size={22} 
            color={activeTab === 'notifications' ? '#395185' : '#9CA3AF'}
            strokeWidth={activeTab === 'notifications' ? 2.5 : 2}
          />
          <span 
            className="text-xs font-medium"
            style={{ color: activeTab === 'notifications' ? '#395185' : '#9CA3AF' }}
          >
            Powiadomienia
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('settings'); setCurrentPath(['root']); }}
          className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all"
        >
          <Settings 
            size={22} 
            color={activeTab === 'settings' ? '#395185' : '#9CA3AF'}
            strokeWidth={activeTab === 'settings' ? 2.5 : 2}
          />
          <span 
            className="text-xs font-medium"
            style={{ color: activeTab === 'settings' ? '#395185' : '#9CA3AF' }}
          >
            Ustawienia
          </span>
        </button>
      </nav>

      {/* ==================== MODALS ==================== */}
      
      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-800 font-semibold text-lg">Dodaj nowy element</h3>
              <button
                onClick={() => { setShowAddModal(false); setNewItemName(''); }}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} color="#6B7280" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1.5">Nazwa</label>
                <input
                  type="text"
                  placeholder="Nazwa elementu"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-800"
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-gray-600 text-sm mb-1.5">Typ</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewItemType('folder')}
                    className={`flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all border-2 ${
                      newItemType === 'folder' 
                        ? 'border-rex-blue bg-blue-50 text-rex-blue' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Folder size={18} />
                    Folder
                  </button>
                  <button
                    onClick={() => setNewItemType('file')}
                    className={`flex-1 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all border-2 ${
                      newItemType === 'file' 
                        ? 'border-rex-blue bg-blue-50 text-rex-blue' 
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <FileText size={18} />
                    Plik PDF
                  </button>
                </div>
              </div>
              
              {newItemType === 'file' && (
                <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-center">
                  <Upload size={32} color="#9CA3AF" className="mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Przeciągnij plik PDF lub kliknij</p>
                  <p className="text-gray-400 text-xs mt-1">(Demo - upload niedostępny)</p>
                </div>
              )}
              
              <button
                onClick={handleAddItem}
                disabled={!newItemName.trim()}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-rex-blue"
              >
                <Plus size={18} />
                Dodaj element
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Item Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-800 font-semibold text-lg">Edytuj element</h3>
              <button
                onClick={() => { setShowEditModal(false); setEditingItem(null); setNewItemName(''); }}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X size={20} color="#6B7280" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm mb-1.5">Nazwa</label>
                <input
                  type="text"
                  placeholder="Nazwa elementu"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 text-gray-800"
                  autoFocus
                />
              </div>
              
              <button
                onClick={handleEditItem}
                disabled={!newItemName.trim()}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-rex-blue"
              >
                <Save size={18} />
                Zapisz zmiany
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} color="#EF4444" />
              </div>
              <h3 className="text-gray-800 font-semibold text-lg mb-2">Usuń element?</h3>
              <p className="text-gray-500 text-sm">
                Czy na pewno chcesz usunąć "{itemToDelete?.name}"?
                {itemToDelete?.type === 'folder' && ' Wszystkie elementy wewnątrz również zostaną usunięte.'}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => { setShowDeleteConfirm(false); setItemToDelete(null); }}
                className="flex-1 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
              >
                Anuluj
              </button>
              <button
                onClick={handleDeleteItem}
                className="flex-1 py-3 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 transition-all"
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
