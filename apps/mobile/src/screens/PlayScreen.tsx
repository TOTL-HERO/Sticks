import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { getCourseDataProvider, type Course } from '../services/courseDataProvider';
import { useRoundStore } from '../stores/roundStore';
import { useAppStore } from '../stores/appStore';
import { apiFetch } from '../lib/api';

export function PlayScreen() {
  const navigation = useNavigation<any>();
  const { activeRound, startRound } = useRoundStore();
  const setHideTabBar = useAppStore((s) => s.setHideTabBar);

  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [starting, setStarting] = useState(false);

  const searchCourses = useCallback(async (text: string) => {
    setQuery(text);
    if (text.length < 2) { setCourses([]); setSearched(false); return; }
    setLoading(true); setSearched(true);
    try { const provider = getCourseDataProvider(); const results = await provider.searchCourses(text); setCourses(results); }
    catch { setCourses([]); }
    finally { setLoading(false); }
  }, []);

  const handleStartRound = useCallback(async () => {
    if (!selectedCourse) { Alert.alert('Select a Course', 'Please search and select a course first.'); return; }
    setStarting(true);
    try {
      const res = await apiFetch<{ id: string }>('/rounds', { method: 'POST', body: JSON.stringify({ courseName: selectedCourse.name, courseId: selectedCourse.id, coursePar: selectedCourse.par }) });
      startRound({ id: res.id, courseId: selectedCourse.id, courseName: selectedCourse.name, coursePar: selectedCourse.par, startedAt: new Date().toISOString() });
      setHideTabBar(false); navigation.navigate('Scoring');
    } catch (err: any) { Alert.alert('Error', err.message ?? 'Could not start round'); }
    finally { setStarting(false); }
  }, [selectedCourse, startRound, setHideTabBar, navigation]);

  const handleResumeRound = useCallback(() => { navigation.navigate('Scoring'); }, [navigation]);

  if (activeRound) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.center}>
          <MaterialCommunityIcons name="golf" size={64} color="#84d7af" />
          <Text style={styles.heading}>Round in Progress</Text>
          <Text style={styles.subtext}>{activeRound.courseName} — Hole {activeRound.currentHole}</Text>
          <Button variant="primary" fullWidth onPress={handleResumeRound}>Resume Round</Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.heading}>Play</Text>
        <Text style={styles.subtext}>Select a course to start your round</Text>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color="#88938c" />
          <TextInput style={styles.searchInput} value={query} onChangeText={searchCourses} placeholder="Search courses..." placeholderTextColor="#3f4943" />
          {loading && <ActivityIndicator size="small" color="#84d7af" />}
        </View>

        {selectedCourse && (
          <Card marginBottom={16} flexDirection="row" alignItems="center">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#84d7af" />
              <View style={{ flex: 1 }}>
                <Text style={styles.selectedName}>{selectedCourse.name}</Text>
                <Text style={styles.selectedMeta}>Par {selectedCourse.par} • {selectedCourse.holeCount} holes</Text>
              </View>
            </View>
          </Card>
        )}

        <FlatList
          data={courses} keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{ flex: 1 }}
          ListEmptyComponent={searched && !loading ? (
            <View style={styles.empty}><MaterialCommunityIcons name="golf-tee" size={40} color="#3f4943" /><Text style={styles.emptyText}>No courses found</Text></View>
          ) : null}
          renderItem={({ item }) => {
            const isSelected = selectedCourse?.id === item.id;
            return (
              <TouchableOpacity onPress={() => setSelectedCourse(item)} activeOpacity={0.7}>
                <View style={[styles.courseRow, isSelected && styles.courseRowSelected]}>
                  <View style={styles.courseIcon}><MaterialCommunityIcons name="golf" size={22} color="#006747" /></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.courseName}>{item.name}</Text>
                    <Text style={styles.courseLoc}>{item.location.city}, {item.location.state}</Text>
                  </View>
                  {isSelected && <MaterialCommunityIcons name="check-circle" size={22} color="#84d7af" />}
                </View>
              </TouchableOpacity>
            );
          }}
        />

        <View style={{ paddingTop: 16, paddingBottom: 120, gap: 12 }}>
          <Button variant="primary" fullWidth onPress={handleStartRound}>{starting ? 'Starting...' : 'Start Round'}</Button>
          <Button variant="secondary" fullWidth onPress={() => navigation.navigate('TeeTimes')}>Book Tee Time</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101511' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 24 },
  content: { flex: 1, padding: 20 },
  heading: { color: '#dfe4dd', fontFamily: 'Newsreader', fontSize: 32, fontStyle: 'italic', marginBottom: 8 },
  subtext: { color: '#bec9c1', fontFamily: 'Manrope', fontSize: 13, marginBottom: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c211c', borderRadius: 12, borderWidth: 1, borderColor: '#3f4943', paddingHorizontal: 12, marginBottom: 16 },
  searchInput: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },
  selectedName: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#84d7af' },
  selectedMeta: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
  empty: { alignItems: 'center', paddingVertical: 24 },
  emptyText: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', marginTop: 12 },
  courseRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c211c', borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#3f4943' },
  courseRowSelected: { backgroundColor: 'rgba(132,215,175,0.08)', borderWidth: 2, borderColor: '#84d7af' },
  courseIcon: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  courseName: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  courseLoc: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
});
