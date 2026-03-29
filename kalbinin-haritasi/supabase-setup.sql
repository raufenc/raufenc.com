-- ============================================
-- Kalbinin Haritası — Supabase Veritabanı Kurulumu
-- Bu dosyayı Supabase Dashboard → SQL Editor'de çalıştır
-- ============================================

-- 1. Kullanıcı profilleri
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Yeni kullanıcı kayıt olunca otomatik profil oluştur
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. Test sonuçları
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_key TEXT NOT NULL,
  tefrit INTEGER NOT NULL DEFAULT 0,
  fazilet INTEGER NOT NULL DEFAULT 0,
  ifrat INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_test_results_user ON test_results(user_id);
CREATE INDEX idx_test_results_key ON test_results(user_id, test_key);

-- 3. Sınıflar
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_classes_code ON classes(join_code);

-- 4. Sınıf üyelikleri
CREATE TABLE class_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(class_id, user_id)
);

CREATE INDEX idx_members_class ON class_members(class_id);
CREATE INDEX idx_members_user ON class_members(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_members ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Kendi profilini oku" ON profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Kendi profilini güncelle" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Öğretmen, sınıfındaki öğrencilerin profilini görebilir
CREATE POLICY "Öğretmen sınıf profillerini görür" ON profiles
  FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT cm.user_id FROM class_members cm
      JOIN classes c ON c.id = cm.class_id
      WHERE c.teacher_id = auth.uid()
    )
  );

-- TEST RESULTS
CREATE POLICY "Kendi sonuçlarını oku" ON test_results
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Kendi sonuçlarını yaz" ON test_results
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kendi sonuçlarını sil" ON test_results
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Öğretmen, sınıfındaki öğrencilerin sonuçlarını görebilir
CREATE POLICY "Öğretmen sınıf sonuçlarını görür" ON test_results
  FOR SELECT TO authenticated
  USING (
    user_id IN (
      SELECT cm.user_id FROM class_members cm
      JOIN classes c ON c.id = cm.class_id
      WHERE c.teacher_id = auth.uid()
    )
  );

-- CLASSES
CREATE POLICY "Öğretmen kendi sınıflarını görür" ON classes
  FOR SELECT TO authenticated
  USING (teacher_id = auth.uid());

CREATE POLICY "Öğretmen sınıf oluşturur" ON classes
  FOR INSERT TO authenticated
  WITH CHECK (teacher_id = auth.uid());

CREATE POLICY "Öğretmen sınıfını siler" ON classes
  FOR DELETE TO authenticated
  USING (teacher_id = auth.uid());

-- Öğrenci, üye olduğu sınıfları görebilir
CREATE POLICY "Öğrenci kendi sınıflarını görür" ON classes
  FOR SELECT TO authenticated
  USING (
    id IN (SELECT class_id FROM class_members WHERE user_id = auth.uid())
  );

-- Katılım kodu ile sınıf bilgisi sorgulanabilir (herkes)
CREATE POLICY "Katılım kodu ile sınıf ara" ON classes
  FOR SELECT TO authenticated
  USING (TRUE); -- join_code ile arama için gerekli

-- CLASS MEMBERS
CREATE POLICY "Öğretmen sınıf üyelerini görür" ON class_members
  FOR SELECT TO authenticated
  USING (
    class_id IN (SELECT id FROM classes WHERE teacher_id = auth.uid())
  );

CREATE POLICY "Öğrenci kendi üyeliklerini görür" ON class_members
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Öğrenci sınıfa katılır" ON class_members
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Öğrenci sınıftan ayrılır" ON class_members
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
