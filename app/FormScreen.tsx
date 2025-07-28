import CheckItem from '@/components/CheckItem';
import { getAllRecords } from '@/utils/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FormData, MaintenanceRecord } from '../@types';

interface FormScreenProps {
  onNavigateBack: () => void;
  recordId: number | null;
}

const FormScreen: React.FC<FormScreenProps> = ({ onNavigateBack, recordId }) => {
  const [formData, setFormData] = useState<FormData>({
    plate: '',
    date: '',
    km: '',
    type: 'Periyodik',
    technician: '',
    checks: {
      bodywork: { status: null, notes: '' },
      windows: { status: null, notes: '' },
      tireTread: { status: null, notes: '' },
      tirePressure: { status: null, notes: '' },
      wheels: { status: null, notes: '' },
      oilLevel: { status: null, notes: '' },
      coolant: { status: null, notes: '' },
      fuelFilter: { status: null, notes: '' },
      airFilter: { status: null, notes: '' },
      exhaust: { status: null, notes: '' },
      brakePads: { status: null, notes: '' },
      brakeFluid: { status: null, notes: '' },
      shockAbsorbers: { status: null, notes: '' },
      tierods: { status: null, notes: '' },
      battery: { status: null, notes: '' },
      lights: { status: null, notes: '' },
      ac: { status: null, notes: '' },
    },
    completedWork: '',
    postTests: {
      idleBalance: { status: null, notes: '' },
      temperature: { status: null, notes: '' },
      abnormalSounds: { status: null, notes: '' },
      brakePerformance: { status: null, notes: '' },
      gearShifts: { status: null, notes: '' },
      steering: { status: null, notes: '' },
      leaks: { status: null, notes: '' },
      obdScan: { status: null, notes: '' },
    },
  });

  useEffect(() => {
    const loadRecordForEdit = async () => {
      if (recordId !== null) {
        const records = await getAllRecords();
        const found = records.find(r => r.id === recordId);
        if (found) {
          const { id, status, ...rest } = found;
          setFormData({
            ...formData,
            ...rest,
          });
        }
      }
    };
    loadRecordForEdit();
  }, [recordId]);


  const handleCheckChange = (
    category: 'checks' | 'postTests',
    item: string,
    field: 'status' | 'notes',
    value: boolean | string | null
  ) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: {
          ...prev[category][item],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    try {
      const all = await getAllRecords();

      let updatedRecords: MaintenanceRecord[] = [];

      if (recordId !== null) {
        updatedRecords = all.map(r =>
          r.id === recordId
            ? { ...r, ...formData }
            : r
        );
      } else {
        const newRecord: MaintenanceRecord = {
          ...formData,
          id: Date.now(),
          status: 'pending',
        };
        updatedRecords = [...all, newRecord];
      }

      await AsyncStorage.setItem('maintenanceRecords', JSON.stringify(updatedRecords));

      Alert.alert('Başarılı', 'Kayıt işlemi tamamlandı.', [
        { text: 'Tamam', onPress: onNavigateBack },
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onNavigateBack}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Bakım/Onarım Formu</Text>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Kaydet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* A. Genel Bilgiler */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="file-document" size={20} color="#2563EB" />
              <Text style={styles.sectionTitle}>A. GENEL BİLGİLER</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Araç Plakası</Text>
              <TextInput
                style={styles.input}
                placeholder="34 ABC 123"
                placeholderTextColor="#9CA3AF"
                value={formData.plate}
                onChangeText={text => setFormData({ ...formData, plate: text })}
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.inputLabel}>Bakım Tarihi</Text>
                <TextInput
                  style={styles.input}
                  placeholder="GG/AA/YYYY"
                  placeholderTextColor="#9CA3AF"
                  value={formData.date}
                  onChangeText={text => setFormData({ ...formData, date: text })}
                />
              </View>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.inputLabel}>Kilometre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="125,000"
                  placeholderTextColor="#9CA3AF"
                  value={formData.km}
                  onChangeText={text => setFormData({ ...formData, km: text })}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.inputLabel}>Bakım Türü</Text>
                <View style={styles.selectContainer}>
                  <TouchableOpacity
                    style={[
                      styles.selectButton,
                      formData.type === 'Periyodik' && styles.selectButtonActive,
                    ]}
                    onPress={() => setFormData({ ...formData, type: 'Periyodik' })}
                  >
                    <Text
                      style={[
                        styles.selectButtonText,
                        formData.type === 'Periyodik' && styles.selectButtonTextActive,
                      ]}
                    >
                      Periyodik
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.selectButton,
                      formData.type === 'Arıza' && styles.selectButtonActive,
                    ]}
                    onPress={() => setFormData({ ...formData, type: 'Arıza' })}
                  >
                    <Text
                      style={[
                        styles.selectButtonText,
                        formData.type === 'Arıza' && styles.selectButtonTextActive,
                      ]}
                    >
                      Arıza
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.inputLabel}>Teknisyen Adı</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ahmet Yılmaz"
                  placeholderTextColor="#9CA3AF"
                  value={formData.technician}
                  onChangeText={text => setFormData({ ...formData, technician: text })}
                />
              </View>
            </View>
          </View>


          {/* B. Bakım Öncesi Kontroller */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>B. BAKIM ÖNCESİ KONTROLLER</Text>

            {/* 1. Dış Gövde ve Şasi */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>1. Dış Gövde ve Şasi</Text>
              <CheckItem
                label="Kaporta (çizik, ezik, pas)"
                value={formData.checks.bodywork}
                onChange={(field, value) => handleCheckChange('checks', 'bodywork', field, value)}
              />
              <CheckItem
                label="Camlar ve aynalar"
                value={formData.checks.windows}
                onChange={(field, value) => handleCheckChange('checks', 'windows', field, value)}
              />
              <CheckItem
                label="Lastik diş derinliği"
                value={formData.checks.tireTread}
                onChange={(field, value) => handleCheckChange('checks', 'tireTread', field, value)}
              />
              <CheckItem
                label="Lastik hava basıncı"
                value={formData.checks.tirePressure}
                onChange={(field, value) => handleCheckChange('checks', 'tirePressure', field, value)}
              />
              <CheckItem
                label="Jant ve bijonlar"
                value={formData.checks.wheels}
                onChange={(field, value) => handleCheckChange('checks', 'wheels', field, value)}
              />
            </View>

            {/* 2. Motor ve Yakıt Sistemi */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>2. Motor ve Yakıt Sistemi</Text>
              <CheckItem
                label="Motor yağı seviyesi"
                value={formData.checks.oilLevel}
                onChange={(field, value) => handleCheckChange('checks', 'oilLevel', field, value)}
              />
              <CheckItem
                label="Soğutma suyu/antifriz"
                value={formData.checks.coolant}
                onChange={(field, value) => handleCheckChange('checks', 'coolant', field, value)}
              />
              <CheckItem
                label="Yakıt filtresi"
                value={formData.checks.fuelFilter}
                onChange={(field, value) => handleCheckChange('checks', 'fuelFilter', field, value)}
              />
              <CheckItem
                label="Hava filtresi"
                value={formData.checks.airFilter}
                onChange={(field, value) => handleCheckChange('checks', 'airFilter', field, value)}
              />
              <CheckItem
                label="Egzoz sistemi kaçakları"
                value={formData.checks.exhaust}
                onChange={(field, value) => handleCheckChange('checks', 'exhaust', field, value)}
              />
            </View>

            {/* 3. Fren ve Süspansiyon */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>3. Fren ve Süspansiyon</Text>
              <CheckItem
                label="Fren balataları"
                value={formData.checks.brakePads}
                onChange={(field, value) => handleCheckChange('checks', 'brakePads', field, value)}
              />
              <CheckItem
                label="Fren hidroliği"
                value={formData.checks.brakeFluid}
                onChange={(field, value) => handleCheckChange('checks', 'brakeFluid', field, value)}
              />
              <CheckItem
                label="Amortisörler"
                value={formData.checks.shockAbsorbers}
                onChange={(field, value) => handleCheckChange('checks', 'shockAbsorbers', field, value)}
              />
              <CheckItem
                label="Rot başları"
                value={formData.checks.tierods}
                onChange={(field, value) => handleCheckChange('checks', 'tierods', field, value)}
              />
            </View>

            {/* 4. Elektrik ve Aydınlatma */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>4. Elektrik ve Aydınlatma</Text>
              <CheckItem
                label="Akü voltajı (12.6V+)"
                value={formData.checks.battery}
                onChange={(field, value) => handleCheckChange('checks', 'battery', field, value)}
              />
              <CheckItem
                label="Far ve sinyal lambaları"
                value={formData.checks.lights}
                onChange={(field, value) => handleCheckChange('checks', 'lights', field, value)}
              />
              <CheckItem
                label="Klima çalışması"
                value={formData.checks.ac}
                onChange={(field, value) => handleCheckChange('checks', 'ac', field, value)}
              />
            </View>
          </View>

          {/* C. Bakım/Onarım Yapılan İşlemler */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>C. BAKIM/ONARIM YAPILAN İŞLEMLER</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Yapılan işlemleri detaylı olarak yazınız..."
              placeholderTextColor="#9CA3AF"
              value={formData.completedWork}
              onChangeText={text => setFormData({ ...formData, completedWork: text })}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          {/* D. Bakım Sonrası Testler */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>D. BAKIM SONRASI TESTLER</Text>

            {/* 1. Motor Çalıştırma Testi */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>1. Motor Çalıştırma Testi</Text>
              <CheckItem
                label="Rölanti dengesi"
                value={formData.postTests.idleBalance}
                onChange={(field, value) => handleCheckChange('postTests', 'idleBalance', field, value)}
              />
              <CheckItem
                label="Hararet kontrolü"
                value={formData.postTests.temperature}
                onChange={(field, value) => handleCheckChange('postTests', 'temperature', field, value)}
              />
              <CheckItem
                label="Anormal ses/vibrasyon"
                value={formData.postTests.abnormalSounds}
                onChange={(field, value) => handleCheckChange('postTests', 'abnormalSounds', field, value)}
              />
            </View>

            {/* 2. Test Sürüşü */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>2. Test Sürüşü (10 KM)</Text>
              <CheckItem
                label="Fren performansı"
                value={formData.postTests.brakePerformance}
                onChange={(field, value) => handleCheckChange('postTests', 'brakePerformance', field, value)}
              />
              <CheckItem
                label="Vites geçişleri"
                value={formData.postTests.gearShifts}
                onChange={(field, value) => handleCheckChange('postTests', 'gearShifts', field, value)}
              />
              <CheckItem
                label="Direksiyon hizalama"
                value={formData.postTests.steering}
                onChange={(field, value) => handleCheckChange('postTests', 'steering', field, value)}
              />
            </View>

            {/* 3. Son Kontroller */}
            <View style={styles.subSection}>
              <Text style={styles.subSectionTitle}>3. Son Kontroller</Text>
              <CheckItem
                label="Sıvı kaçakları"
                value={formData.postTests.leaks}
                onChange={(field, value) => handleCheckChange('postTests', 'leaks', field, value)}
              />
              <CheckItem
                label="OBD-II arıza taraması"
                value={formData.postTests.obdScan}
                onChange={(field, value) => handleCheckChange('postTests', 'obdScan', field, value)}
              />
            </View>
          </View>

          {/* E. Onay ve Belgelendirme */}
          <View style={[styles.section, styles.lastSection]}>
            <Text style={styles.sectionTitle}>E. ONAY VE BELGELENDİRME</Text>
            <View style={styles.signatureRow}>
              <TouchableOpacity style={styles.signatureBox}>
                <MaterialCommunityIcons name="draw" size={32} color="#9CA3AF" />
                <Text style={styles.signatureLabel}>Teknisyen İmzası</Text>
                <Text style={styles.signatureHint}>İmza eklemek için tıklayın</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signatureBox}>
                <MaterialCommunityIcons name="draw" size={32} color="#9CA3AF" />
                <Text style={styles.signatureLabel}>Kalite Kontrol İmzası</Text>
                <Text style={styles.signatureHint}>İmza eklemek için tıklayın</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FormScreen;

// src/screens/FormScreen.tsx - Styles (FormScreen dosyasının sonuna eklenecek)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 0,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  lastSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  subSection: {
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputGroupHalf: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  selectContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  selectButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  selectButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  selectButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectButtonTextActive: {
    color: '#FFFFFF',
  },
  signatureRow: {
    flexDirection: 'row',
    gap: 12,
  },
  signatureBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  signatureLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
  },
  signatureHint: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
});