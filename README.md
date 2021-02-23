# Pandora FMS Data Source Plugin

Pandora FMS data source allows you to visualize any data monitorized by any module in your Pandora FMS instance.

On each query added to your panel you can find the following form fields:

- **Label**: The name shown for the query in the graph. It uses the module name if empty.
- **Group**: List of groups accesibles by the user set in the datasource configuration. Groups can be filtered by their name. It's used to filter the agents available.
- **Agent**: List of agents assigned to the group selected. If group "All" is set, then all agents accesibles by the user set in the datasource configuration will be shown. Agents can be filtered by their alias. It's used to filter the modules available to show in the graph.
- **Module**: List of modules available in the agent selected. Modules can be filtered by their name.
- **TIP**: If not checked, then data is a compact representation of the time range. Else, then all real data is shown.