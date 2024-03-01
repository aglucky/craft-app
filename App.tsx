import React, { useState } from 'react';

import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { CONVEX_URL } from "@env";
import { fetchCraft } from 'neal_api';
import Graph from './Graph';

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <Graph />
    </ConvexProvider>
  );
}
