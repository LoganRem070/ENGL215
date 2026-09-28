function smoke()
    local vals = {}
    local range = 45

    for i=1, math.random(0, 4) do
        vals[math.random(0, range)] = true
    end

    for i=1, range do
        io.write((vals[i] ~= nil) and "#" or " ")
    end
    io.write("\n")
end

function wait(seconds)
    local start = os.clock()
    while os.clock() - start < seconds do end
end

repeat
    smoke()
    wait(0.1)
until "fires" == "die out"