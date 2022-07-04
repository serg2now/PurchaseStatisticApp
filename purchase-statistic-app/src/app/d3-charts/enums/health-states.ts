export enum HealthState {
    OnTrack = "On Track",
    Attention = "Attention",
    Critical = "Critical"
}

export const HealthStateColors = {
    [HealthState.OnTrack] : '#6EDC90',
    [HealthState.Attention] : '#F4A945',
    [HealthState.Critical]: '#F73A35'
};