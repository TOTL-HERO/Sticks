import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { apiFetch } from '../../lib/api';

interface ProfileBasicsStepProps {
  data: { firstName: string; lastName: string; avatarUrl: string | null };
  onChange: (data: Partial<ProfileBasicsStepProps['data']>) => void;
}

export function ProfileBasicsStep({ data, onChange }: ProfileBasicsStepProps) {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
      if (!result.canceled && result.assets[0]) await uploadAvatar(result.assets[0].uri);
    } catch { Alert.alert('Error', 'Failed to pick image'); }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') { Alert.alert('Permission needed', 'Camera access is required to take a photo.'); return; }
      const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 });
      if (!result.canceled && result.assets[0]) await uploadAvatar(result.assets[0].uri);
    } catch { Alert.alert('Error', 'Failed to take photo'); }
  };

  const uploadAvatar = async (uri: string) => {
    setUploading(true);
    try {
      const formData = new FormData();
      const filename = uri.split('/').pop() ?? 'avatar.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      formData.append('avatar', { uri, name: filename, type } as any);
      const res = await apiFetch<{ avatarUrl: string }>('/users/me/avatar', { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: formData });
      onChange({ avatarUrl: res.avatarUrl });
    } catch { Alert.alert('Upload failed', 'Could not upload avatar. You can try again later.'); }
    finally { setUploading(false); }
  };

  const showImageOptions = () => {
    Alert.alert('Profile Photo', 'Choose a source', [
      { text: 'Camera', onPress: takePhoto },
      { text: 'Photo Library', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Avatar Upload */}
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={showImageOptions} activeOpacity={0.8}>
          <View>
            <View style={styles.avatarBox}>
              {uploading ? (
                <ActivityIndicator size="large" color="#84d7af" />
              ) : data.avatarUrl ? (
                <Image source={{ uri: data.avatarUrl }} style={{ width: 120, height: 120 }} />
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <MaterialCommunityIcons name="camera" size={36} color="#88938c" />
                  <Text style={styles.uploadLabel}>Upload</Text>
                </View>
              )}
            </View>
            <View style={styles.plusBtn}>
              <MaterialCommunityIcons name="plus" size={20} color="#003825" />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.avatarHint}>Add a profile photo for the clubhouse</Text>
      </View>

      {/* Name Fields */}
      <View style={{ gap: 20 }}>
        <View>
          <Text style={styles.fieldLabel}>First Name</Text>
          <TextInput
            value={data.firstName}
            onChangeText={(text) => onChange({ firstName: text })}
            placeholder="e.g. Alister"
            style={styles.input}
            placeholderTextColor="#3f4943"
          />
        </View>
        <View>
          <Text style={styles.fieldLabel}>Last Name</Text>
          <TextInput
            value={data.lastName}
            onChangeText={(text) => onChange({ lastName: text })}
            placeholder="e.g. Mackenzie"
            style={styles.input}
            placeholderTextColor="#3f4943"
          />
        </View>
        <Text style={styles.hint}>
          Your name will be visible to other members during match booking and on the live leaderboards.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSection: { alignItems: 'center', marginBottom: 32 },
  avatarBox: { width: 120, height: 120, borderRadius: 20, backgroundColor: '#1c211c', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderWidth: 1, borderColor: '#3f4943' },
  uploadLabel: { fontFamily: 'Manrope', fontSize: 9, fontWeight: '700', color: '#bec9c1', marginTop: 4, textTransform: 'uppercase', letterSpacing: 2 },
  plusBtn: { position: 'absolute', bottom: -6, right: -6, width: 32, height: 32, borderRadius: 12, backgroundColor: '#84d7af', alignItems: 'center', justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 },
  avatarHint: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', fontStyle: 'italic', marginTop: 16, textAlign: 'center' },
  fieldLabel: { fontFamily: 'Manrope', fontSize: 10, fontWeight: '700', color: '#bec9c1', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8, marginLeft: 4 },
  input: { backgroundColor: '#1c211c', borderWidth: 1, borderColor: '#3f4943', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },
  hint: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1', fontStyle: 'italic', marginTop: 4, paddingHorizontal: 4, lineHeight: 18 },
});
