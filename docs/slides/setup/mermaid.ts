import { defineMermaidSetup } from '@slidev/types'

// Light, high-contrast theme matching the deck's cyan/blue palette.
// Goal: light fills, dark readable text, soft borders — no dark backgrounds.
export default defineMermaidSetup(() => ({
  theme: 'base',
  themeVariables: {
    // Canvas
    background: '#ffffff',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    fontSize: '15px',

    // Flowchart nodes (primary = cyan, secondary = blue, tertiary = indigo)
    primaryColor: '#e0f2fe',
    primaryTextColor: '#155e75',
    primaryBorderColor: '#0891b2',
    secondaryColor: '#eff6ff',
    secondaryTextColor: '#1e40af',
    secondaryBorderColor: '#2563eb',
    tertiaryColor: '#eef2ff',
    tertiaryTextColor: '#4338ca',
    tertiaryBorderColor: '#4f46e5',

    // Edges & labels
    lineColor: '#64748b',
    edgeLabelBackground: '#ffffff',
    textColor: '#334155',

    // Flowchart misc
    mainBkg: '#e0f2fe',
    nodeBorder: '#0891b2',
    nodeTextColor: '#155e75',

    // Subgraphs (clusters)
    clusterBkg: '#f8fafc',
    clusterBorder: '#94a3b8',

    // Sequence diagram
    actorBkg: '#e0f2fe',
    actorBorder: '#0891b2',
    actorTextColor: '#155e75',
    actorLineColor: '#94a3b8',
    signalColor: '#475569',
    signalTextColor: '#1f2937',
    activationBkgColor: '#cffafe',
    activationBorderColor: '#0891b2',

    // Notes
    noteBkgColor: '#fef9c3',
    noteBorderColor: '#eab308',
    noteTextColor: '#713f12',

    // Labels / loops / title
    labelBoxBkgColor: '#e0f2fe',
    labelBoxBorderColor: '#0891b2',
    labelTextColor: '#155e75',
    loopTextColor: '#1f2937',
    titleColor: '#1f2937',
  },
}))
