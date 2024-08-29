/**
 * Author: Meng
 * Date: 2024-08-29
 * Modify: 2024-08-29
 * Desc: 
 */

import { addEventListener } from "@react-native-community/netinfo";

// Subscribe
const unsubscribe = addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

// Unsubscribe
// unsubscribe();