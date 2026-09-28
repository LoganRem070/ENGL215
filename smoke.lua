--[[

    Smoke.lua
    - Code Poetry for ENGL 215

    @author Logan Rembisz
    @date September 28th, 2026

]]

function n(o, t) return math.random(o, t) end --#--
function rises() local s = os.clock() while os.clock() - s < 0.1 do end end
local v, r = {}, 45         --#--
    --#--
the, fires, burn = "bright", "in the", "morning"
                    --#--
function smoke(rises, into, the, air)                    --#--
        --#--
    for i=1, n(0, 4) do  --#--
        v[n(0, r)] = true           --#--
    end         --#--

    visible = "for miles"
            --#--
    for i=1, r do                   --#--
        io.write((v[i]) and "#" or " ") v[i] = nil
    end                    --#--
    io.write("\n")
end     --#--
                                    --#--
                                                --#--
                --#--
repeat                      --#--
    smoke() rises() until "fires" == "die out"