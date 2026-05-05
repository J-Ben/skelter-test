import { StyleSheet } from 'react-native';

import { CONTAINER_PADDING } from '@/src/constants/layout';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  focusToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#eee',
  },
  focusToggleActive: {
    backgroundColor: '#0a84ff',
  },
  focusToggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
  },
  focusToggleTextActive: {
    color: '#fff',
  },
  itemWrap: {
    position: 'relative',
  },
  codeBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(30,30,30,0.75)',
  },
  codeBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Menlo',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: CONTAINER_PADDING,
    gap: 16,
    paddingBottom: 32,
  },
  empty: {
    paddingVertical: 48,
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
  bottomBar: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: 12,
    paddingBottom: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  addRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: CONTAINER_PADDING,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fafafa',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e5e5e5',
  },
});
